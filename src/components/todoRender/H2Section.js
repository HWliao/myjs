function title(h) {
  return h('h1', {
    domProps: {
      innerHTML: this.title,
    },
  });
}
function input(h) {
  const vm = this;
  return h('input', {
    class: {
      'new-todo': true,
    },
    attrs: {
      autofocus: 'autofocus',
      autocomplete: 'off',
      placeholder: vm.placeholder,
    },
    domProps: {
      value: vm.value,
    },
    on: {
      input(e) {
        vm.value = e.target.value;
      },
      keyup(e) {
        if (e && e.keyCode === 13) {
          vm.$emit('addTodo', vm.value);
          vm.value = '';
        }
      },
    },
  });
}
const header = {
  name: 'h2section',
  data() {
    return {
      value: '',
    };
  },
  props: {
    title: {
      type: String,
      default: 'todos',
    },
    placeholder: {
      type: String,
      default: 'What needs to be done?',
    },
  },
  render(h) {
    const data = {
      class: {
        header: true,
      },
    };
    const childs = [];
    childs.push(title.call(this, h));
    childs.push(input.call(this, h));
    return h('header', data, childs);
  },
};

export default header;
