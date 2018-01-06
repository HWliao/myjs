import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [NavComponent, NotFoundComponent],
  declarations: [NavComponent, NotFoundComponent]
})
export class MainModule {
}
