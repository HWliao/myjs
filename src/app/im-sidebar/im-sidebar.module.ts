import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as ImSidebarState from './reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(ImSidebarState.feature, ImSidebarState.reducers)
  ],
  declarations: []
})
export class ImSidebarModule {
}
