import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import { BaseEpic } from '../store/epics';
import { BaseAction } from '../store/actions';
import { ImRootActionType } from '../container/actions';
import { combineEpics } from 'redux-observable';
import { imCoreDestroyAction, imCoreInitAction } from './actions';

export const initImCoreEpic: BaseEpic<BaseAction> = (action$, store, {core}) => {
  return action$
    .ofType(ImRootActionType.init)
    .do(() => core.init())
    .mapTo(imCoreInitAction());
};

export const desroyImCoreEpic: BaseEpic<BaseAction> = (action$, store, {core}) => {
  return action$
    .ofType(ImRootActionType.destroy)
    .do(() => core.destroy())
    .mapTo(imCoreDestroyAction());
};

export const createImCoreEpics = () => combineEpics<BaseEpic>(
  initImCoreEpic,
  desroyImCoreEpic
);
