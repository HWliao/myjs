function p2footer(h, type) {
  const vm = this;
  const childs = [];
  if (type === 0) {
    childs.push(vm.info);
  } else if (type === 1) {
    childs.push('Written by ');
    childs.push(h('a', {
      domProps: {
        href: vm.writeBy.href,
      },
    }, [vm.writeBy.content]));
  } else {
    childs.push('Part of ');
    childs.push(h('a', {
      domProps: {
        href: vm.partOf.href,
      },
    }, [vm.partOf.content]));
  }
  return h('p', childs);
}

const footer = {
  name: 'todoFooter',
  props: {
    info: {
      type: String,
      default: 'Double-click to edit a todo',
    },
    writeBy: {
      type: Object,
      default() {
        return {
          content: 'Evan You',
          href: 'http://evanyou.me',
        };
      },
    },
    partOf: {
      type: Object,
      default() {
        return {
          content: 'TodoMVC',
          href: 'http://todomvc.com',
        };
      },
    },
  },
  render(h) {
    const data = {
      class: {
        info: true,
      },
    };
    const childs = [];
    childs.push(p2footer.call(this, h, 0));
    childs.push(p2footer.call(this, h, 1));
    childs.push(p2footer.call(this, h, 2));
    return h('footer', data, childs);
  },
};

export default footer;
