import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule, NzLayoutModule, NzSliderModule } from 'ng-zorro-antd';

import { LayoutComponent } from './layout/layout.component';

// import { AppModule } from '../app.module'; // 这样会报错:循环依赖
import {TestModule} from "../test/test.module";

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzSliderModule,
    NzButtonModule,
    TestModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
