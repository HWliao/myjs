import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import { Inject, Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../core/logger/logger.service';
import { Store } from '@ngrx/store';
import { getInitedState } from '../../reducers';
import { AppDestroyAction, AppInitAction } from '../../actions/app.actions';
import { Subscription } from 'rxjs/Subscription';
import { ConfigModel } from '../models/config.model';
import { ConfigSetAction } from '../actions/config.actions';
import { getImConfigState } from '../reducers';

/**
 * 对外服务
 * @author lhw
 * @date 2018年2月11日16:47:24
 */
@Injectable()
export class OutletService implements OnDestroy {

  private subscription: Subscription;

  private inited: boolean;

  private config: ConfigModel;

  constructor(@Inject(LoggerService) private logger: LoggerService, @Inject(Store) private store: Store<any>) {
    this.subscription = Observable
      .merge(
        this.store.select(getInitedState).do((inited: boolean) => this.inited = inited),
        this.store.select(getImConfigState).do((config: ConfigModel) => this.config = Object.assign({}, config))
      )
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

  /**
   * 是否初始化
   * @returns {boolean}
   */
  isInited(): boolean {
    return this.inited;
  }

  /**
   * 设置配置项
   * @param {ConfigModel} config
   */
  setConfig(config: ConfigModel = {}) {
    this.store.dispatch(new ConfigSetAction(Object.assign({}, config)));

  }

  /**
   * 获取配置对象
   * @returns {ConfigModel}
   */
  getConfig(): ConfigModel {
    return this.config;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  /**
   * 显示/隐藏
   * @param {boolean} flag
   */
  show(flag: boolean = true) {

  }

  isShow(): boolean {
    return true;
  }

  toggleUpDown(up?: boolean) {

  }

  isUp(): boolean {
    return true;
  }
}
