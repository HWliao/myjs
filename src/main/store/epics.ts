import { combineEpics, Epic } from 'redux-observable';
import { BaseState } from './reducers';
import { BaseAction } from './actions';
import { imLayoutEpic } from '../container/im-layout/epics';

export interface BaseEpic<O extends BaseAction = BaseAction> extends Epic<BaseAction, BaseState, any, O> {

}

const epics: BaseEpic[] = [imLayoutEpic];

export const createRootEpic = () => combineEpics<BaseEpic>(...epics);
