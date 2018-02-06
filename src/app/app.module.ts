import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ImLayoutModule } from './im-layout/im-layout.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ImLayoutModule
  ],
  providers: [],
  entryComponents: [AppComponent],
})
export class AppModule {
  ngDoBootstrap(applicationRef: ApplicationRef) {
    // NgModule bootstap属性为空
    // 如果NgModule bootstap 没有设置 ngDoBootstrap 在引导启动时会被调用

    // 什么都不用做
    // NgModule bootstap 不设置,ngDoBootstrap 回调钩子给一个空函数
    // 导致Module被引导启动的时候,只做一些初始化动作,并不会渲染整个应用

    // NgModule entryComponents 指定入口组件,在Module初始化的时候会产生对应的ComponentFactory
    // 当Ngmodule被引导初始化后,可以通过NgModuleRef获取到ComponentFactory和ApplicationRef
    // 并通过ApplicationRef.bootstrap() 手动控制整个应用的UI渲染
  }
}
