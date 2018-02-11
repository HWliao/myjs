import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as ConfigState from './config.reducer';

export const feature = 'imOutlet';

export interface State {
  config: ConfigState.State;
}

export const reducers: ActionReducerMap<State> = {
  config: ConfigState.reducer
};
/**
 * 获取外部应用的状态
 * @type {MemoizedSelector<object, any>}
 */
export const getImOutletState = createFeatureSelector(feature);
/**
 * 获取im 配置状态
 * @type {MemoizedSelector<object, State>}
 */
export const getImCofigState = createSelector(getImOutletState, (state: State) => state.config);
