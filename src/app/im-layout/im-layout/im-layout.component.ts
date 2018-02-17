import 'rxjs/add/operator/map';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getImLayoutShowState, getImLayoutUpState } from '../reducers';

@Component({
  selector: 'im-layout',
  templateUrl: './im-layout.component.html'
})
export class ImLayoutComponent implements OnInit, OnDestroy {

  private show$: Observable<string>;
  private up$: Observable<boolean>;

  constructor(@Inject(Store) private store: Store<any>) {
  }

  ngOnInit() {
    this.show$ = this.store.select(getImLayoutShowState).map((isShow: boolean) => isShow ? 'block' : 'none');
    this.up$ = this.store.select(getImLayoutUpState).map((isUp: boolean) => !isUp);
  }

  ngOnDestroy() {
  }

}
