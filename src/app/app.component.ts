import { Component, OnDestroy, OnInit } from '@angular/core';
import { OutletService } from './im-outlet/service/outlet.service';

@Component({
  selector: 'im-root',
  template: '<im-layout></im-layout>',
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private outletService: OutletService) {
  }

  ngOnInit(): void {
    this.outletService.setInit(true);
  }

  ngOnDestroy(): void {
    this.outletService.setInit(false);
  }
}
