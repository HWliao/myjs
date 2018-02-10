import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export const feature = 'imOutlet';

export interface State {
}

export const reducers: ActionReducerMap<State> = {};
/**
 * 获取外部应用的状态
 * @type {MemoizedSelector<object, any>}
 */
export const getImOutletState = createFeatureSelector(feature);
