import {
  ApplicationRef, ComponentFactory, ComponentRef, enableProdMode, NgModuleRef
} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}
const button = document.getElementById('test');
const button2 = document.getElementById('test2');

let componetRef: ComponentRef<AppComponent>;

button.addEventListener('click', () => {
  // 应用1 初始化
  const div1 = document.createElement('div');
  document.body.appendChild(div1);
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then((moduleRef: NgModuleRef<AppModule>) => {
      // 在这里达成一个platform,多个application启动控制
      // 多个应用的启动,打包大小有问题

      // 获取应用应用
      const applicationRef = moduleRef.injector.get(ApplicationRef);
      // 获取入口组件
      const componentFactory: ComponentFactory<AppComponent> = moduleRef.componentFactoryResolver.resolveComponentFactory(AppComponent);
      // 引导整个组件树的初始化
      componetRef = applicationRef.bootstrap(componentFactory, div1);
    })
    .catch(err => console.log(err));
});
button2.addEventListener('click', () => {
  componetRef.destroy();
  // 这里可以更加细粒度控制应用1,2销毁
});

