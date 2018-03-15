import { combineEpics, Epic } from 'redux-observable';
import { BaseState } from './reducers';
import { BaseAction } from './actions';

export interface BaseEpic<O extends BaseAction = BaseAction> extends Epic<BaseAction, BaseState, any, O> {

}

const epics: BaseEpic[] = [];

export const createRootEpic = () => combineEpics<BaseEpic>(...epics);
