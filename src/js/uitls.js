/**
 * 工具方法
 * Created by lenovo on 2017/8/21.
 */
import Quill from 'quill/dist/quill.core';
import extend from 'extend';

const Delta = Quill.import('delta');
const Parchment = Quill.import('parchment');
const DOM_KEY = '__ql-matcher';

export function applyFormat(delta, format, value) {
  if (typeof format === 'object') {
    return Object
      .keys(format)
      .reduce((delta1, key) => applyFormat(delta1, key, format[key]), delta);
  }
  return delta.reduce((delta2, op) => {
    if (op.attributes && op.attributes[format]) {
      return delta2.push(op);
    }
    return delta2.insert(op.insert, extend({}, {
      [format]: value,
    }, op.attributes));
  }, new Delta());
}

export function computeStyle(node) {
  if (node.nodeType !== Node.ELEMENT_NODE) return {};
  // eslint-disable-next-line no-param-reassign
  node['__ql-computed-style'] = node['__ql-computed-style'] || window.getComputedStyle(node);
  return node['__ql-computed-style'];
}

export function deltaEndsWith(delta, text) {
  let endText = '';
  // eslint-disable-next-line no-plusplus
  for (let i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
    const op = delta.ops[i];
    if (typeof op.insert !== 'string') break;
    endText = op.insert + endText;
  }
  return endText.slice(-1 * text.length) === text;
}

export function isLine(node) {
  if (node.childNodes.length === 0) return false; // Exclude embed blocks
  const style = computeStyle(node);
  return ['block', 'list-item'].indexOf(style.display) > -1;
}

export function traverse(node, elementMatchers, textMatchers) { // Post-order
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce((delta, matcher) => matcher(node, delta), new Delta());
  } else if (node.nodeType === node.ELEMENT_NODE) {
    return [].reduce.call(node.childNodes || [], (delta, childNode) => {
      let childrenDelta = traverse(childNode, elementMatchers, textMatchers);
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers
          .reduce((childrenDelta1, matcher) => matcher(childNode, childrenDelta1), childrenDelta);
        childrenDelta = (childNode[DOM_KEY] || [])
          .reduce((childrenDelta2, matcher) => matcher(childNode, childrenDelta2), childrenDelta);
      }
      return delta.concat(childrenDelta);
    }, new Delta());
  }
  return new Delta();
}

export function matchAlias(format, node, delta) {
  return applyFormat(delta, format, true);
}

//  export function matchAttributor(node, delta) {
//    const attributes = Parchment.Attributor.Attribute.keys(node);
//    const classes = Parchment.Attributor.Class.keys(node);
//    const styles = Parchment.Attributor.Style.keys(node);
//    const formats = {};
//    attributes.concat(classes).concat(styles).forEach((name) => {
//      let attr = Parchment.query(name, Parchment.Scope.ATTRIBUTE);
//      if (attr != null) {
//        formats[attr.attrName] = attr.value(node);
//        if (formats[attr.attrName]) return;
//      }
//      attr = ATTRIBUTE_ATTRIBUTORS[name];
//      if (attr != null && attr.attrName === name) {
//        formats[attr.attrName] = attr.value(node) || undefined;
//      }
//      attr = STYLE_ATTRIBUTORS[name]
//      if (attr != null && attr.attrName === name) {
//        attr = STYLE_ATTRIBUTORS[name];
//        formats[attr.attrName] = attr.value(node) || undefined;
//      }
//    });
//    if (Object.keys(formats).length > 0) {
//      delta = applyFormat(delta, formats);
//    }
//    return delta;
//  }

export function matchBlot(node, delta) {
  const match = Parchment.query(node);
  if (match == null) return delta;
  if (match.prototype instanceof Parchment.Embed) {
    const embed = {};
    const value = match.value(node);
    if (value != null) {
      embed[match.blotName] = value;
      // eslint-disable-next-line no-param-reassign
      delta = new Delta().insert(embed, match.formats(node));
    }
  } else if (typeof match.formats === 'function') {
    // eslint-disable-next-line no-param-reassign
    delta = applyFormat(delta, match.blotName, match.formats(node));
  }
  return delta;
}

export function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    delta.insert('\n');
  }
  return delta;
}

export function matchIgnore() {
  return new Delta();
}

export function matchIndent(node, delta) {
  const match = Parchment.query(node);
  if (match == null || match.blotName !== 'list-item' || !deltaEndsWith(delta, '\n')) {
    return delta;
  }
  let indent = -1;
  let parent = node.parentNode;
  while (!parent.classList.contains('ql-clipboard')) {
    if ((Parchment.query(parent) || {}).blotName === 'list') {
      indent += 1;
    }
    parent = parent.parentNode;
  }
  if (indent <= 0) return delta;
  return delta.compose(new Delta().retain(delta.length() - 1).retain(1, {
    indent,
  }));
}

export function matchNewline(node, delta) {
  if (!deltaEndsWith(delta, '\n')) {
    if (isLine(node) || (delta.length() > 0 && node.nextSibling && isLine(node.nextSibling))) {
      delta.insert('\n');
    }
  }
  return delta;
}

export function matchSpacing(node, delta) {
  if (isLine(node) && node.nextElementSibling != null && !deltaEndsWith(delta, '\n\n')) {
    const nodeHeight = node.offsetHeight
      + parseFloat(computeStyle(node).marginTop)
      + parseFloat(computeStyle(node).marginBottom);
    if (node.nextElementSibling.offsetTop > node.offsetTop + (nodeHeight * 1.5)) {
      delta.insert('\n');
    }
  }
  return delta;
}

export function matchStyles(node, delta) {
  const formats = {};
  const style = node.style || {};
  if (style.fontStyle && computeStyle(node).fontStyle === 'italic') {
    formats.italic = true;
  }
  if (style.fontWeight && (computeStyle(node).fontWeight.startsWith('bold') ||
    parseInt(computeStyle(node).fontWeight, 10) >= 700)) {
    formats.bold = true;
  }
  if (Object.keys(formats).length > 0) {
    // eslint-disable-next-line no-param-reassign
    delta = applyFormat(delta, formats);
  }
  if (parseFloat(style.textIndent || 0) > 0) { // Could be 0.5in
    // eslint-disable-next-line no-param-reassign
    delta = new Delta().insert('\t').concat(delta);
  }
  return delta;
}

export function matchText(node, delta) {
  let text = node.data;
  // Word represents empty line with <o:p>&nbsp;</o:p>
  if (node.parentNode.tagName === 'O:P') {
    return delta.insert(text.trim());
  }
  if (text.trim().length === 0 && node.parentNode.classList.contains('ql-clipboard')) {
    return delta;
  }
  if (!computeStyle(node.parentNode).whiteSpace.startsWith('pre')) {
    // eslint-disable-next-line func-style
    const replacer = (collapse, match) => {
      // eslint-disable-next-line no-param-reassign
      match = match.replace(/[^\u00a0]/g, ''); // \u00a0 is nbsp;
      return match.length < 1 && collapse ? ' ' : match;
    };
    text = text.replace(/\r\n/g, ' ').replace(/\n/g, ' ');
    text = text.replace(/\s\s+/g, replacer.bind(replacer, true)); // collapse whitespace
    if ((node.previousSibling == null && isLine(node.parentNode)) ||
      (node.previousSibling != null && isLine(node.previousSibling))) {
      text = text.replace(/^\s+/, replacer.bind(replacer, false));
    }
    if ((node.nextSibling == null && isLine(node.parentNode)) ||
      (node.nextSibling != null && isLine(node.nextSibling))) {
      text = text.replace(/\s+$/, replacer.bind(replacer, false));
    }
  }
  return delta.insert(text);
}
