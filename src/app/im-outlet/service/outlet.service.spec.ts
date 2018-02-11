import 'rxjs/add/operator/do';
import { inject, TestBed } from '@angular/core/testing';

import { OutletService } from './outlet.service';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { LoggerService } from '../../core/logger/logger.service';
import * as AppState from '../../reducers';
import * as OutletState from '../reducers';
import { AppDestroyAction, AppInitAction } from '../../actions/app.actions';

describe('OutletService', () => {

  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...AppState.reducers,
          [OutletState.feature]: combineReducers(OutletState.reducers)
        })
      ],
      providers: [LoggerService, OutletService]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  it('should be created', inject([OutletService], (service: OutletService) => {
    expect(service).toBeTruthy();
  }));

  it('should dispatch APP_INIT action', inject([OutletService], (service: OutletService) => {
    service.setInit(true);
    expect(store.dispatch).toHaveBeenCalledWith(new AppInitAction());
  }));

  it('should dispatch APP_DESTROY action', inject([OutletService], (service: OutletService) => {
    service.setInit(false);
    expect(store.dispatch).toHaveBeenCalledWith(new AppDestroyAction());
  }));
});
