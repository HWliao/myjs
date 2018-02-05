import { EventEmitter } from 'eventemitter3';
import { ApplicationRef, ComponentRef, NgModuleRef } from '@angular/core';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/core/config/config.service';
import { ConfigModel } from './app/core/config/config.model';
import { AppComponent } from './app/app.component';

/**
 * Im对外APi
 * @author lhw
 */
export class Im extends EventEmitter {

  /**
   * ng module 对象
   */
  private readonly moduleRef: NgModuleRef<AppModule>;
  /**
   * 配置服务
   */
  private readonly configService: ConfigService;
  /**
   * 根组件
   */
  private rootCompRef: ComponentRef<AppComponent>;

  constructor(moduleRef: NgModuleRef<AppModule>) {
    super();
    this.moduleRef = moduleRef;
    this.configService = moduleRef.injector.get(ConfigService);
  }

  /**
   * 初始化根组件
   */
  init() {
    if (this.rootCompRef) {
      return;
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

  /**
   * 销毁根组件
   * 只对组件进行销毁,服务以及数据不销毁,与nim-sdk初始化同步数据有关
   */
  destroy() {
    if (this.rootCompRef) {
      this.rootCompRef.destroy();
      this.rootCompRef = null;
    }
  }

  /**
   * 设置配置
   * @param {ConfigModel} config
   */
  setConfig(config: ConfigModel) {
    return this.configService.setConfig(config);
  }
}
