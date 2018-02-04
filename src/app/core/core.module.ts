import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config/config.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ConfigService]
})
export class CoreModule {
}
