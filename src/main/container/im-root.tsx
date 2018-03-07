import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import Test from './test';
import { Provider } from 'react-redux';
import { storeConfigure } from '../store/stroe';
import { Store } from 'redux';

export default class ImRoot extends PureComponent<{}, {}> {
  private store: Store<any>;

  constructor(props: {}) {
    super(props);
    this.store = storeConfigure();
  }

  render() {
    return (
      <Provider store={this.store}>
        <Test/>
      </Provider>
    );
  }
}

export function mount(el: HTMLElement): Promise<any> {
  return new Promise(resolve => {
    ReactDOM.render(<ImRoot/>, el, () => resolve());
  });
}

export function unmount(el: HTMLElement): boolean {
  return ReactDOM.unmountComponentAtNode(el);
}
