import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { feature, reducers } from './reducers';
import { OutletService } from './service/outlet.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(feature, reducers)
  ],
  declarations: [],
  providers: [OutletService]
})
export class ImOutletModule {
}
