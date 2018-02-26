import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'im-sidebar-header',
  templateUrl: './im-sidebar-header.component.html'
})
export class ImSidebarHeaderComponent implements OnInit {

  /**
   * 头部标题
   * @type {string}
   */
  @Input() title = '';

  /**
   * 收起按钮的标题
   * @type {string}
   */
  @Input() toggleTitle = '';

  /**
   * 总未读数
   * @type {number}
   */
  @Input() unread = 0;
  unread$: Observable<number>;

  /**
   * 是否闪动
   * @type {boolean}
   */
  @Input()
  set shake(shake: boolean) {
    if (shake) {
      this.shake$.next(Observable.interval(1000).scan((curr) => !curr, true));
    } else {
      this.shake$.next(Observable.of(true));
    }
  }

  shake$ = new BehaviorSubject<Observable<boolean>>(Observable.of(true));
  show$: Observable<boolean>;

  constructor(private cdr: ChangeDetectorRef) {
    this.show$ = this.shake$.switch().distinctUntilChanged();
  }

  ngOnInit() {
  }

  needShow() {
    return this.unread > 0;
  }
}
