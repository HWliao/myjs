import { autoFoucs } from './directive';

function div(h) {
  const vm = this;
  const data = {
    on: {
      dblclick() {
        vm.isEdited = true;
      },
    },
  };
  return h('div', data, 'div');
}
function input1(h) {
  const vm = this;
  const data = {
    class: {
      edit: true,
    },
    attrs: {
      type: 'text',
    },
    domProps: {
      value: vm.title,
    },
    on: {
      input() {
        console.log('input');
      },
      blur() {
        console.log('blur');
      },
      keyup() {
        console.log('keyup');
      },
    },
    directives: [{
      name: 'todoFocus',
      value: vm.isEdited,
    }],
  };
  return h('input', data);
}

const li = {
  name: 'todoItem',
  data() {
    return {
      isEdited: false,
    };
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    },
  },
  directives: {
    todoFocus: autoFoucs,
  },
  render(h) {
    const vm = this;
    const data = {
      class: {
        todo: true,
        completed: vm.completed,
        editing: vm.isEdited,
      },
      key: vm.id,
    };
    const childs = [];
    childs.push(div.call(this, h));
    childs.push(input1.call(this, h));
    return h('li', data, childs);
  },
};

export default li;
