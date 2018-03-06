import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import Test from './test';
import { Provider } from 'react-redux';
import { store } from '../store/stroe';

export default class ImRoot extends PureComponent<{}, {}> {
  render() {
    return (
      <Provider store={store}>
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
