import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatChipsModule, MatDividerModule, MatGridListModule, MatIconModule,
  MatListModule, MatMenuModule, MatRippleModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatRippleModule,
    MatDividerModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule
  ],
  declarations: []
})
export class SharedModule {
}
