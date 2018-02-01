import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImDocService } from './im-doc.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ImDocService],
  declarations: []
})
export class CoreModule {
}
