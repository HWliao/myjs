import { dispatch, getState, storeConfigure, subscribe } from '../stroe';
import { BaseAction } from '../actions';

describe('stroe', () => {
  describe('storeConfigure', () => {
    it('should run without error', () => {
      storeConfigure();
      expect(true).toBeTruthy();
    });
  });

  describe('dispatch', () => {
    it('should be call the store dispatch method', () => {
      const store = storeConfigure();
      const dispatchSpy = spyOn(store, 'dispatch');
      const action: BaseAction = {type: 'test'};
      dispatch(action);
      expect(dispatchSpy).lastCalledWith(action);
    });
  });

  describe('getState', () => {
    it('should got null', () => {
      try {
        getState();
        expect(true).toBeTruthy();
      } catch (e) {
        expect(false).toBeTruthy();
      }
    });
  });

  describe('subscribe', () => {
    it('should be return selector return value', (done) => {
      subscribe((state) => null).subscribe((r) => {
        expect(r).toBe(null);
        done();
      });
    });
  });
});
