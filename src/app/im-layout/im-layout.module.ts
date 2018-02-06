import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ImLayoutComponent } from './im-layout/im-layout.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ImLayoutComponent],
  exports: [ImLayoutComponent]
})
export class ImLayoutModule {
}
