import { combineEpics, Epic } from 'redux-observable';
import { BaseState } from './reducers';
import { testEpic } from '../container/im-test/epics';
import { BaseAction } from './actions';

export interface BaseEpic<O extends BaseAction = BaseAction> extends Epic<BaseAction, BaseState, any, O> {

}

const epics: BaseEpic[] = [
  testEpic
];

export function createRootEpic() {
  return combineEpics<BaseEpic>(...epics);
}
