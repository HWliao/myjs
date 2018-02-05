import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ConfigModel } from './app/core/config/config.model';
import { Im } from './im-api';

if (environment.production) {
  enableProdMode();
}

// 当前im实例
let im: Im;

/**
 * 创建im组件
 * @param {ConfigModel} config
 * @returns {Promise<Im>}
 */
export default function createIm(config?: ConfigModel): Promise<Im> {
  return Promise.resolve()
    .then(() => {
      if (im) {
        return im;
      }
      return platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .then((appModuleRef: NgModuleRef<AppModule>) => {
          im = new Im(appModuleRef);
          if (config) {
            im.setConfig(config);
          }
          return im;
        });
    })
    .catch((err) => {
      console.error(err);
      return Promise.reject(err);
    });
}


