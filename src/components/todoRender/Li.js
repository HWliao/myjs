import { autoFoucs } from './directive';

function div(h) {
  const vm = this;
  const data = {
    on: {
      dblclick() {
        vm.isEdited = true;
        vm.oldTitle = vm.todo.tile;
      },
    },
  };
  return h('div', data, [vm.todo.title]);
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
      value: vm.showValue,
    },
    on: {
      input(e) {
        vm.currTitle = e.target.value;
      },
      blur() {
        vm.isEdited = false;
        vm.oldTitle = '';
        if (vm.oldTitle.trim() !== vm.currTitle.trim()) {
          vm.$emit('editDone', vm.todo, vm.currTitle);
        }
      },
      keyup(e) {
        if (e.keyCode === 13) {
          vm.isEdited = false;
          vm.oldTitle = '';
          if (vm.oldTitle.trim() !== vm.currTitle.trim()) {
            vm.$emit('editDone', vm.todo, vm.currTitle);
          }
        } else if (e.keyCode === 27) {
          vm.isEdited = false;
          vm.oldTitle = '';
          vm.currTitle = vm.oldTitle;
        }
        console.log(e);
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
      currTitle: '',
      oldTitle: '',
    };
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    showValue() {
      if (this.isEdited) {
        this.oldTitle = this.todo.title;
      }
      this.currTitle = this.todo.title;
      return this.todo.title;
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
        completed: vm.todo.complete,
        editing: vm.isEdited,
      },
      key: vm.todo.id,
    };
    const childs = [];
    childs.push(div.call(this, h));
    childs.push(input1.call(this, h));
    return h('li', data, childs);
  },
};

export default li;
