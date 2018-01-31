import { NgModule } from '@angular/core';
import { DocComponent } from './doc/doc.component';
import { DocRoutingModule } from './doc-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    DocRoutingModule
  ],
  declarations: [
    DocComponent
  ]
})
export class DocModule {
}
