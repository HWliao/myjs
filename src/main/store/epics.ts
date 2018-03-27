import { combineEpics, Epic } from 'redux-observable';
import { BaseState } from './reducers';
import { BaseAction } from './actions';
import { createImLayoutEpics } from '../container/im-layout/epics';
import { getImCoreInstance, ImCoreInterface } from '../im-core/im-core';
import { ImModel } from '../im-api/model/im.model';
import { getImInstance } from '../im-api/im';
import { createImCoreEpics } from '../im-core/epics';

export interface EpicsDependencies {
  core: ImCoreInterface;
  api: ImModel;
}

export const createDependencies: () => EpicsDependencies = () => ({
  core: getImCoreInstance(),
  api: getImInstance()
});

export interface BaseEpic<O extends BaseAction = BaseAction>
  extends Epic<BaseAction, BaseState, EpicsDependencies | any, O> {

}

export const createRootEpic = () => combineEpics<BaseEpic>(
  createImLayoutEpics(),
  createImCoreEpics()
);
