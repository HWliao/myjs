import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { BaseEpic } from '../store/epics';
import { BaseAction, imEmptyAction } from '../store/actions';
import { ImRootActionType } from '../container/actions';
import { combineEpics } from 'redux-observable';
import { imCoreDestroyAction, imCoreInitAction } from './actions';
import { ImApiActionType } from '../im-api/actions';

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

export const loginImCoreEpic: BaseEpic = (action$, store, {core}) => {
  return action$
    .ofType(ImApiActionType.login)
    .map((action) => action.payload.toJS())
    .do(({accid, token}) => core.connect(accid, token))
    .mapTo(imEmptyAction());
};

export const createImCoreEpics = () => combineEpics<BaseEpic>(
  initImCoreEpic,
  desroyImCoreEpic,
  loginImCoreEpic
);
