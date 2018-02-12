import { EventEmitter } from 'eventemitter3';
import { ApplicationRef, ComponentRef, NgModuleRef } from '@angular/core';
import { AppModule } from './app/app.module';
import { ConfigModel } from './app/im-outlet/models/config.model';
import { AppComponent } from './app/app.component';
import { OutletService } from './app/im-outlet/service/outlet.service';

export interface Im {
  /**
   * 设置配置
   * @param {ConfigModel} config
   */
  setConfig(config: ConfigModel): void;

  /**
   * 初始化根组件
   */
  init(): void;

  /**
   * 销毁根组件
   * 只对组件进行销毁,服务以及数据不销毁,与nim-sdk初始化同步数据有关
   */
  destroy(): void;

  /**
   * 是否初始化
   * @returns {boolean}
   */
  isInited(): boolean;
}

class ImApi extends EventEmitter implements Im {
  /**
   * ng module 对象
   */
  private readonly moduleRef: NgModuleRef<AppModule>;
  /**
   * im 对外服务
   */
  private readonly outletService: OutletService;
  /**
   * 根组件
   */
  private rootCompRef: ComponentRef<AppComponent>;

  constructor(moduleRef: NgModuleRef<AppModule>) {
    super();
    this.moduleRef = moduleRef;
    this.outletService = moduleRef.injector.get(OutletService);
  }

  init() {
    if (this.rootCompRef) {
      throw new Error('thers is already a root component.');
    }
    // 动态初始化根组件
    const div = document.createElement('div');
    document.body.appendChild(div);
    // 获取应用应用
    const applicationRef = this.moduleRef.injector.get(ApplicationRef);
    // 获取入口组件
    const componentFactory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(AppComponent);
    // 引导整个组件树的初始化
    this.rootCompRef = applicationRef.bootstrap(componentFactory, div);
  }

  isInited(): boolean {
    return this.outletService.isInited();
  }

  destroy() {
    if (!this.rootCompRef) {
      throw new Error('there is no root component.');
    }
    this.rootCompRef.destroy();
    this.rootCompRef = null;
  }

  setConfig(config: ConfigModel) {
    return this.outletService.setConfig(config);
  }
}

/**
 * 创建Im实例
 * @param {NgModuleRef<AppModule>} moduleRef
 * @return {Im}
 */
export function createImApi(moduleRef: NgModuleRef<AppModule>): Im {
  return new ImApi(moduleRef);
}
