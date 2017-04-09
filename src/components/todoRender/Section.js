import header from './H2Section';
import s2section from './S2Section';

function header1(h) {
  const vm = this;
  const data = {
    on: {
      addTodo(value) {
        vm.$emit(value);
      },
    },
  };
  return h(header, data);
}

const section = {
  name: 'todoSection',
  data() {
    return {};
  },
  props: {},
  render(h) {
    const data = {
      class: {
        todoapp: true,
      },
    };
    const childs = [];
    childs.push(header1.call(this, h));
    childs.push(h(s2section));
    return h('section', data, childs);
  },
};

export default section;
