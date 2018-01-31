import { NgModule } from '@angular/core';
import { DocComponent } from './doc/doc.component';
import { DocRoutingModule } from './doc-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrismModule } from '@ngx-prism/core';

@NgModule({
  imports: [
    SharedModule,
    DocRoutingModule,
    PrismModule
  ],
  declarations: [
    DocComponent
  ]
})
export class DocModule {
}
