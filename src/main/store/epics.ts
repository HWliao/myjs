import { combineEpics, Epic } from 'redux-observable';
import { BaseState } from './reducers';
import { BaseAction } from './actions';
import { imLayoutEpic } from '../container/im-layout/epics';
import { getImCoreInstance, ImCore } from '../im-core/im-core';
import { ImModel } from '../im-api/model/im.model';
import { getImInstance } from '../im-api/im';

export interface EpicsDependencies {
  core: ImCore;
  api: ImModel;
}

export const createDependencies: () => EpicsDependencies = () => ({
  core: getImCoreInstance(),
  api: getImInstance()
});

export interface BaseEpic<O extends BaseAction = BaseAction> extends Epic<BaseAction, BaseState, EpicsDependencies, O> {

}

const epics: BaseEpic[] = [imLayoutEpic];

export const createRootEpic = () => combineEpics<BaseEpic>(...epics);
