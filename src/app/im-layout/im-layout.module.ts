import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ImLayoutComponent } from './containers/im-layout.component';
import { StoreModule } from '@ngrx/store';
import { feature, reducers } from './reducers';
import { ImSidebarModule } from '../im-sidebar/im-sidebar.module';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature(feature, reducers),
    ImSidebarModule
  ],
  declarations: [ImLayoutComponent],
  exports: [ImLayoutComponent]
})
export class ImLayoutModule {
}
