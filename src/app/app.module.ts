import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { TestComponent } from './test.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    LayoutModule
  ],
  declarations: [AppComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
