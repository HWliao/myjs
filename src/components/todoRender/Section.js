import header from './H2Section';

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
    childs.push(h(header));
    return h('section', data, childs);
  },
};

export default section;
