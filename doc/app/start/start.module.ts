import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StartComponent } from './start/start.component';
import { StartRoutingModule } from './start-routing.module';

@NgModule({
  imports: [
    SharedModule,
    StartRoutingModule
  ],
  declarations: [StartComponent]
})
export class StartModule {
}
