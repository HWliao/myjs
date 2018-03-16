import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ImRoot, { mount, unmount } from '../im-root';
import { storeConfigure } from '../../store/stroe';
import { imRootInitAction, imRootDestroyAction } from '../actions';

const store = storeConfigure();

describe('im root component', () => {
  describe('mount', () => {
    it('should not crash', () => {
      const div = document.createElement('div');
      ReactDOM.render(<ImRoot store={store.store}/>, div);
    });
  });

  describe('mount/unmout', () => {
    let div: HTMLElement;

    beforeEach(() => {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    it('should not crash mount/unmount', () => {
      const dispatchSpy = spyOn(store.store, 'dispatch');
      return mount(div, store.store).then(() => {
        expect(dispatchSpy).lastCalledWith(imRootInitAction());
        unmount(div);
        expect(dispatchSpy).lastCalledWith(imRootDestroyAction());
      });
    });
  });
});
