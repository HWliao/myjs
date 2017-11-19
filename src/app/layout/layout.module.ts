import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule, NzLayoutModule, NzSliderModule } from 'ng-zorro-antd';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzSliderModule,
    NzButtonModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
