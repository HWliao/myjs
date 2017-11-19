import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import {TestModule} from "./test/test.module";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LayoutModule,
    TestModule
  ],
  declarations: [AppComponent],
  // exports:[TestComponent],// 导出给子模块用 , 不然默认该模块的所有组件都是私有的
  bootstrap: [AppComponent]
})
export class AppModule {
}
