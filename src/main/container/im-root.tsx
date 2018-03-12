import '../../assets/css/im.css';
import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import ImLayout from './im-layout/im-layout.container';
import { BaseState } from '../store/reducers';

export default class ImRoot extends PureComponent<{ store: Store<BaseState> }, {}> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ImLayout/>
      </Provider>
    );
  }
}

export function mount(el: HTMLElement, store: Store<BaseState>): Promise<any> {
  return new Promise(resolve => {
    ReactDOM.render(<ImRoot store={store}/>, el, () => resolve());
  });
}

export function unmount(el: HTMLElement): boolean {
  return ReactDOM.unmountComponentAtNode(el);
}
