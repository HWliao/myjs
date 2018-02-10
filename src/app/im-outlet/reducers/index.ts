import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as ImRootReducers from './im-root.reducers';

export const feature = 'imOutlet';

export interface State {
  imRoot: ImRootReducers.State;
}

export const reducers: ActionReducerMap<State> = {
  imRoot: ImRootReducers.reducer
};
/**
 * 获取外部应用的状态
 * @type {MemoizedSelector<object, any>}
 */
export const getImOutletState = createFeatureSelector(feature);
/**
 * 获取根组件初始化状态
 * @type {MemoizedSelector<object, boolean>}
 */
export const getImRootInited = createSelector(getImOutletState, ImRootReducers.isInited);
