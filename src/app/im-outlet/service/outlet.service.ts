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
import { getImLayoutShowState, getImLayoutUpState } from '../../im-layout/reducers';
import {
  ImLayoutDownAction, ImLayoutHideAction, ImLayoutShowAction,
  ImLayoutUpAction
} from '../../im-layout/actions/im-layout.action';

/**
 * 对外服务
 * @author lhw
 * @date 2018年2月11日16:47:24
 */
@Injectable()
export class OutletService implements OnDestroy {

  private subscription: Subscription;

  private _inited: boolean;
  private _config: ConfigModel;
  private _show: boolean;
  private _up: boolean;

  constructor(@Inject(LoggerService) private logger: LoggerService, @Inject(Store) private store: Store<any>) {
    this.subscription = Observable
      .merge(
        this.store.select(getInitedState).do((inited: boolean) => this._inited = inited),
        this.store.select(getImConfigState).do((config: ConfigModel) => this._config = Object.assign({}, config)),
        this.store.select(getImLayoutShowState).do((show: boolean) => this._show = show),
        this.store.select(getImLayoutUpState).do((up: boolean) => this._up = up)
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
    return this._inited;
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
    return this._config;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  /**
   * 显示/隐藏
   * @param {boolean} flag
   */
  show(flag: boolean = true) {
    this.checkRootInited();
    this.store.dispatch(flag ? new ImLayoutShowAction() : new ImLayoutHideAction());
  }

  /**
   * 是否显示
   * @returns {boolean}
   */
  isShow(): boolean {
    return this._show;
  }

  /**
   * 折叠
   * @param {boolean} up
   */
  toggleUpDown(up?: boolean) {
    this.checkRootInited();
    let toUp;
    if (up === undefined || up === null) {
      toUp = !this._up;
    } else {
      toUp = up;
    }
    this.store.dispatch(toUp ? new ImLayoutUpAction() : new ImLayoutDownAction());
  }

  /**
   * 是否展开
   * @returns {boolean}
   */
  isUp(): boolean {
    return this._up;
  }

  /**
   * 检查是否初始化
   * @returns {boolean}
   */
  checkRootInited() {
    if (!this.isInited()) {
      throw new Error('should init the root component first');
    }
    return this.isInited();
  }
}
