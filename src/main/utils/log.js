/* eslint-disable no-bitwise,guard-for-in,no-restricted-syntax,prefer-const */
// Avoid `console` errors in browsers that lack a console.
const noop = () => {
};
const methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn',
];
let { length } = methods;
window.console = window.console || {};
const { console } = window;

// eslint-disable-next-line no-plusplus
while (length--) {
  // Only stub undefined methods.
  if (!console[methods[length]]) {
    console[methods[length]] = noop;
  }
}

// colors
const colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson',
  '#FF6699',
  '#9999FF',
  '#660000',
  '#999933',
];

function selectColor(namespace) {
  let hash = 0;
  for (let i in namespace) {
    hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return colors[Math.abs(hash) % colors.length];
}

let prevTime = +new Date();
let enabled = true;

export function setEnabled(flag = true) {
  enabled = flag;
}

export function createDebug(namespace) {
  const color = selectColor(namespace);
  return (...args) => {
    if (!enabled) return;
    let msgTmp = null;
    let params = null;

    let curr = +new Date();
    let diff = curr - prevTime;
    prevTime = curr;

    if (!args || args.length === 0) {
      msgTmp = '%c[IM] %s  %s';
      params = [`color:${color};`, namespace, `+${diff}ms`];
    } else if (args.length === 1) {
      msgTmp = `%c[IM] %s ${args[0]}  %s`;
      params = [`color:${color};`, namespace, `+${diff}ms`];
    } else {
      msgTmp = `%c[IM] %s ${args.shift()}  %s`;
      params = [`color:${color};`, namespace, ...args, `+${diff}ms`];
    }
    console.log(msgTmp, ...params);
  };
}
