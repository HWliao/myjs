import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCheckboxModule, MatGridListModule, MatIconModule, MatListModule, MatSidenavModule,
  MatSlideToggleModule, MatToolbarModule
} from '@angular/material';
import {
  MdcButtonModule, MdcDrawerModule, MdcFormFieldModule, MdcSwitchModule, MdcThemeModule,
  MdcToolbarModule
} from '@angular-mdc/web';

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
    MdcButtonModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcDrawerModule,
    MdcSwitchModule,
    MdcFormFieldModule
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
    MdcButtonModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcDrawerModule,
    MdcSwitchModule,
    MdcFormFieldModule
  ],
  declarations: []
})
export class SharedModule {
}
