import { testAction, TestAction, TestActionType } from './actions';
import { Observable } from 'rxjs/Observable';
import { BaseEpic } from '../../store/epics';

export const testEpic: BaseEpic<TestAction> = (action$, store) => {
  return action$
    .ofType(TestActionType.Test_CLICK_ACTOIN)
    .switchMap(() => Observable.interval(1000).scan(curr => curr + 1, 0).take(5))
    .map((num: number) => testAction(num));
};
