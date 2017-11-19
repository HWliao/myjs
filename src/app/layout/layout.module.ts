import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LayoutComponent } from './layout/layout.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule
  ],
  declarations: [LayoutComponent],
  exports: [LayoutComponent]
})
export class LayoutModule {
}
