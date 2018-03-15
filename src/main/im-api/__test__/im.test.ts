import { ImModel } from '../model/im.model';
import { getImInstance } from '../im';
import {
  imLayoutDownAction,
  imLayoutHideAction,
  imLayoutShowAction,
  imLayoutUpAction
} from '../../container/im-layout/actions';
import { ImStore, storeConfigure } from '../../store/stroe';
import { selectImRootInited } from '../../container/selectors';
import { selectLayoutShow, selectLayoutUp } from '../../container/im-layout/selectors';
import Spy = jasmine.Spy;

describe('im', () => {

  describe('init/destroy', () => {
    let im: ImModel;
    beforeEach(() => {
      im = getImInstance({});
    });
    it('should not crash call init', () => {
      return im.init();
    });
    it('should not crash call destroy', () => {
      return im.destroy();
    });
  });

  describe('toggle show', () => {
    let spyDispatch: Spy;
    let im: ImModel;
    let imStore: ImStore;
    beforeEach(() => {
      imStore = storeConfigure();
      im = getImInstance({}, undefined, imStore);
      spyDispatch = spyOn(imStore.store, 'dispatch');
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
    let im: ImModel;
    let imStore: ImStore;
    beforeEach(() => {
      imStore = storeConfigure();
      im = getImInstance({}, undefined, imStore);
      spyDispatch = spyOn(imStore.store, 'dispatch');
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

  describe('state', () => {
    let im: ImModel;
    let imStore: ImStore;
    beforeEach(() => {
      imStore = storeConfigure();
      im = getImInstance({}, undefined, imStore);
    });
    it('should return inited', () => {
      const inited: boolean = selectImRootInited(imStore.store.getState());
      expect(im.isInited()).toEqual(inited);
    });
    it('should return show', () => {
      const show: boolean = selectLayoutShow(imStore.store.getState());
      expect(im.isShow()).toEqual(show);
    });
    it('should return up', () => {
      const up: boolean = selectLayoutUp(imStore.store.getState());
      expect(im.isUp()).toEqual(up);
    });
  });

});
