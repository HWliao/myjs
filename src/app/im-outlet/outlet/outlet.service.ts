import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../core/logger/logger.service';
import { Store } from '@ngrx/store';
import { getInitedState, State } from '../../reducers';
import { AppDestroyAction, AppInitAction } from '../../actions/app.actions';

@Injectable()
export class OutletService implements OnDestroy {


  private inited$: Observable<boolean>;

  private inited: boolean;

  constructor(private logger: LoggerService, private store: Store<State>) {
    this.inited$ = this.store.select(getInitedState);
    this.inited$.do((obj: any) => {
      console.log(obj);
    }).catch((err, caught) => {
      this.logger.error(err);
      return Observable.of({});
    }).subscribe();
  }

  /**
   * 设置根组件状态
   * @param {boolean} status
   */
  setInit(status: boolean) {
    if (status) {
      this.store.dispatch(new AppInitAction());
    } else {
      this.store.dispatch(new AppDestroyAction());
    }
  }

  ngOnDestroy(): void {
  }
}
