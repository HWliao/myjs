import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../core/logger/logger.service';
import { Store } from '@ngrx/store';
import { getInitedState, State as AppState } from '../../reducers';
import { AppDestroyAction, AppInitAction } from '../../actions/app.actions';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class OutletService implements OnDestroy {

  private initedSubscription: Subscription;
  private inited$: Observable<boolean>;

  private inited: boolean;

  constructor(@Inject(LoggerService) private logger: LoggerService, @Inject(Store) private store: Store<AppState>) {
    this.inited$ = this.store.select(getInitedState);
    this.initedSubscription = this.inited$
      .do((inited: boolean) => this.inited = inited)
      .catch((err, caught) => {
        this.logger.error(err);
        return caught;
      })
      .subscribe();
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
    this.initedSubscription.unsubscribe();
  }
}
