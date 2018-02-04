import {
  ApplicationRef, ComponentFactory, ComponentRef, enableProdMode, NgModuleRef
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { ConfigModel } from './app/core/config/config.model';
import { ConfigService } from './app/core/config/config.service';
import { Im } from './im-api';

if (environment.production) {
  enableProdMode();
}

/**
 * 创建im组件
 * @param {ConfigModel} config
 * @returns {Promise<Im>}
 */
export default function createIm(config: ConfigModel) {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then((appModuleRef: NgModuleRef<AppModule>) => {
      // 设置配置
      const configService = appModuleRef.injector.get(ConfigService);
      configService.setConfig(config);

      // 动态初始化根组件
      const div = document.createElement('div');
      // 获取应用应用
      const applicationRef = appModuleRef.injector.get(ApplicationRef);
      // 获取入口组件
      const componentFactory: ComponentFactory<AppComponent> = appModuleRef.componentFactoryResolver.resolveComponentFactory(AppComponent);
      // 引导整个组件树的初始化
      applicationRef.bootstrap(componentFactory, div);
      return new Im(appModuleRef);
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
}


