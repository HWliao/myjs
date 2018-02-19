import 'rxjs/add/operator/map';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { getImLayoutShowState, getImLayoutUpState } from '../reducers';

@Component({
  selector: 'im-layout',
  templateUrl: './im-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImLayoutComponent implements OnInit, OnDestroy {

  public static DISPLAY_BLOCK = 'block';
  public static DISPLAY_NONE = 'none';

  private show$: Observable<string>;
  private up$: Observable<boolean>;

  constructor(@Inject(Store) private store: Store<any>) {
  }

  ngOnInit() {
    this.show$ = this.store.select(getImLayoutShowState)
      .map((isShow: boolean) => isShow ? ImLayoutComponent.DISPLAY_BLOCK : ImLayoutComponent.DISPLAY_NONE);
    this.up$ = this.store.select(getImLayoutUpState).map((isUp: boolean) => !isUp);
  }

  ngOnDestroy() {
  }

}
