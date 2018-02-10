import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config/config.service';
import { LoggerService } from './logger/logger.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ConfigService, LoggerService]
})
export class CoreModule {
}
