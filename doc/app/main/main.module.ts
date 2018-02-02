import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { OperationPanelComponent } from './operation-panel/operation-panel.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [NavComponent, NotFoundComponent, OperationPanelComponent],
  declarations: [NavComponent, NotFoundComponent, OperationPanelComponent]
})
export class MainModule {
}
