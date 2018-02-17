import 'rxjs/add/operator/do';
import { inject, TestBed } from '@angular/core/testing';

import { OutletService } from './outlet.service';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { LoggerService } from '../../core/logger/logger.service';
import * as AppState from '../../reducers';
import * as OutletState from '../reducers';
import * as ImLayoutState from '../../im-layout/reducers';
import { AppDestroyAction, AppInitAction } from '../../actions/app.actions';
import { ConfigModel } from '../models/config.model';
import { ConfigSetAction } from '../actions/config.actions';
import { ImLayoutHideAction, ImLayoutShowAction } from '../../im-layout/actions/im-layout.action';
import { setupTestingRouter } from '@angular/router/testing';

describe('OutletService', () => {

  let store: Store<any>;
  let service: OutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...AppState.reducers,
          [OutletState.feature]: combineReducers(OutletState.reducers),
          [ImLayoutState.feature]: combineReducers(ImLayoutState.reducers)
        })
      ],
      providers: [LoggerService, OutletService]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
    service = TestBed.get(OutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setInit', () => {
    it('should dispatch APP_INIT action', () => {
      service.setInit(true);
      expect(store.dispatch).toHaveBeenCalledWith(new AppInitAction());
    });

    it('should dispatch APP_DESTROY action', () => {
      service.setInit(false);
      expect(store.dispatch).toHaveBeenCalledWith(new AppDestroyAction());
    });
  });

  describe('isInited', () => {
    it('should inited be true', () => {
      store.next(new AppInitAction());
      expect(service.isInited()).toBeTruthy();
    });
  });


  describe('config', () => {
    it('should dispatch CONFIG_SET_ACTION', () => {
      const config: ConfigModel = { appKey: 'test' };
      service.setConfig(config);
      expect(store.dispatch).toHaveBeenCalledWith(new ConfigSetAction(config));
    });

    it('should get the config', () => {
      const config: ConfigModel = { appKey: 'test' };
      store.next(new ConfigSetAction(config));
      const theConfig = service.getConfig();
      Object.keys(config).forEach((key) => {
        expect(theConfig[key]).toBe(config[key]);
      });
    });
  });

  fdescribe('show/isShow', () => {
    it('should throw an error need to init', () => {
      try {
        service.show(true);
      } catch (err) {
        expect(err.message).toBe('should init the root component first');
      }
    });
    it('should dispatch IM_LAYOUT_SHOW_ACTION', () => {
      store.next(new AppInitAction());
      service.show(true);
      expect(store.dispatch).toHaveBeenCalledWith(new ImLayoutShowAction());
    });
    it('should dispatch IM_LAYOUT_HIDE_ACTION', () => {
      store.next(new AppInitAction());
      service.show(false);
      expect(store.dispatch).toHaveBeenCalledWith(new ImLayoutHideAction());
    });
    it('should be false init', () => {
      expect(service.isShow()).toBeFalsy();
    });
    it('should be true', () => {
      store.next(new AppInitAction());
      store.next(new ImLayoutShowAction());
      expect(service.isShow()).toBeTruthy();
    });
  });
});
