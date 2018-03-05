import * as React from 'react';
import { PureComponent } from 'react';
import * as ReactDOM from 'react-dom';

export default class ImRoot extends PureComponent<{}, {}> {
  render() {
    return (
      <div style={{position: 'absolute', zIndex: 9999}}>
        im root
      </div>
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
