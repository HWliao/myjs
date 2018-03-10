import * as store from '../../../store/stroe';
import { ImModel } from '../model/im.model';
import { getImInstance } from '../im';
import { imLayoutDownAction, imLayoutHideAction, imLayoutShowAction, imLayoutUpAction } from '../../im-layout/actions';
import Spy = jasmine.Spy;

describe('im', () => {

  let im: ImModel;
  beforeEach(() => {
    im = getImInstance({});
  });

  describe('init', () => {
    it('should not crash call init', () => {
      return im.init();
    });
  });

  describe('destroy', () => {
    it('should not crash call destroy', () => {
      return im.destroy();
    });
  });

  describe('toggle show', () => {
    let spyDispatch: Spy;
    beforeEach(() => {
      spyDispatch = spyOn(store, 'dispatch');
    });
    it('should dispatch show action with true param', () => {
      return im.init().then(() => {
        im.toggleShow(true);
        expect(spyDispatch).lastCalledWith(imLayoutShowAction());
      });
    });
    it('should dispatch hide action with false param', () => {
      return im.init().then(() => {
        im.toggleShow(false);
        expect(spyDispatch).lastCalledWith(imLayoutHideAction());
      });
    });
  });

  describe('toggleUp', () => {
    let spyDispatch: Spy;
    beforeEach(() => {
      spyDispatch = spyOn(store, 'dispatch');
    });

    it('should dispatch up action with true param', () => {
      return im.init().then(() => {
        im.toggleUp(true);
        expect(spyDispatch).lastCalledWith(imLayoutUpAction());
      });
    });

    it('should dispatch down action with false param', () => {
      return im.init().then(() => {
        im.toggleUp(false);
        expect(spyDispatch).lastCalledWith(imLayoutDownAction());
      });
    });

  });

});
