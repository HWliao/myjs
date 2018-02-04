import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImDocService } from './im-doc.service';
import { ImApiService } from './im-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ImDocService, ImApiService],
  declarations: []
})
export class CoreModule {
}
