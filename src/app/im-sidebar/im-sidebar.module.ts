import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as ImSidebarState from './reducers';
import { ImSidebarComponent } from './containers/im-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(ImSidebarState.feature, ImSidebarState.reducers)
  ],
  declarations: [ImSidebarComponent],
  exports: [ImSidebarComponent]
})
export class ImSidebarModule {
}
