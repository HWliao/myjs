import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoggerService } from '../../core/logger/logger.service';

@Injectable()
export class OutletService implements OnDestroy {


  private inited$: Observable<boolean>;

  private inited: boolean;

  constructor(private logger: LoggerService) {
  }

  /**
   * 设置根组件状态
   * @param {boolean} status
   */
  setInit(status: boolean) {
    if (status) {
    } else {
    }
  }

  ngOnDestroy(): void {
  }
}
