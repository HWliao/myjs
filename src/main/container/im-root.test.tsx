import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../rxjs';
import ImRoot, { mount, unmount } from './im-root';

describe('im root component', () => {
  describe('mount', () => {
    it('should not crash', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ImRoot/>, div);
    });
  });

  describe('mount/unmout', () => {
    let div: HTMLElement;

    beforeEach(() => {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    it('should not crash mount/unmount', () => {
      return mount(div).then(() => {
        return unmount(div);
      });
    });
  });
});
