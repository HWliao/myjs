import {
  ApplicationRef, ComponentFactory, enableProdMode, NgModuleRef, PlatformRef
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}
let platform: PlatformRef;

const button = document.getElementById('test');
const button2 = document.getElementById('test2');


button.addEventListener('click', () => {
  platform = platformBrowserDynamic();

  // 应用1 初始化
  const div1 = document.createElement('div');
  document.body.appendChild(div1);
  platform.bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      // 在这里达成一个platform,多个application启动控制

      // 获取应用应用
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      // 获取入口组件
      const componentFactory: ComponentFactory<AppComponent> = moduleRef.componentFactoryResolver.resolveComponentFactory(AppComponent);
      // 引导整个组件树的初始化
      applicationRef.bootstrap(componentFactory, div1);
    })
    .catch(err => console.log(err));

  // // 应用2的初始化
  // const div2 = document.createElement('div');
  // document.body.appendChild(div2);
  // platform.bootstrapModule(AppModule)
  //   .then((moduleRef: NgModuleRef<AppModule>) => {
  //     const applicationRef = moduleRef.injector.get(ApplicationRef);
  //     const componentFactory: ComponentFactory<AppComponent> = moduleRef.componentFactoryResolver.resolveComponentFactory(AppComponent);
  //     applicationRef.bootstrap(componentFactory, div2);
  //   })
  //   .catch(err => console.log(err));
});
button2.addEventListener('click', () => {
  platform.destroy();
  // 这里可以更加细粒度控制应用1,2销毁
});

