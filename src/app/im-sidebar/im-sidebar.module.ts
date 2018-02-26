import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as ImSidebarState from './reducers';
import { ImSidebarComponent } from './containers/im-sidebar.component';
import { ImSidebarHeaderComponent } from './components/im-sidebar-header/im-sidebar-header.component';
import { SidebarNoagentComponent } from './components/sidebar-noagent/sidebar-noagent.component';
import { SidebarNologinComponent } from './components/sidebar-nologin/sidebar-nologin.component';
import { SidebarListComponent } from './components/sidebar-list/sidebar-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImSidebarComponent, ImSidebarHeaderComponent, SidebarNoagentComponent, SidebarNologinComponent, SidebarListComponent],
  exports: [ImSidebarComponent]
})
export class ImSidebarModule {
  static forRoot() {
    return {
      ngModule: ImSidebarModule,
      imports: [
        StoreModule.forFeature(ImSidebarState.feature, ImSidebarState.reducers)
      ]
    };
  }
}
