import * as React from 'react';
import Loading from './Loading';

export type State = {
  component: typeof React.Component | null;
};
/**
 * 生成一个异步加载组件
 * @param importComponent
 * @return {AsyncComponent}
 */
export default function asyncComponent(importComponent: Function) {
  class AsyncComponent extends React.Component<{}, State> {
    constructor(props: {}) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const {default: component} = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : <Loading/>;
    }
  }

  return AsyncComponent;
}
