import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImDocService } from './im-doc/im-doc.service';
import { ImApiService } from './im-api/im-api.service';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [ImDocService, ImApiService],
  declarations: []
})
export class CoreModule {
}
