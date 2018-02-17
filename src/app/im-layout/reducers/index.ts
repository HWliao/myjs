import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { imLayoutShowReducer, imLayoutUpReducer } from './im-layout.reducer';

export const feature = 'imLayout';

export interface State {
  show: boolean;
  up: boolean;
}

export const reducers: ActionReducerMap<State> = {
  show: imLayoutShowReducer,
  up: imLayoutUpReducer
};
/**
 * 获取im layout 状态
 * @type {MemoizedSelector<object, any>}
 */
export const getImLayoutState = createFeatureSelector(feature);
/**
 * 获取显示/隐藏状态
 * @type {MemoizedSelector<object, boolean>}
 */
export const getImLayoutShowState = createSelector(getImLayoutState, (state: State) => state.show);
/**
 * 获取展开/收起状态
 * @type {MemoizedSelector<object, boolean>}
 */
export const getImLayoutUpState = createSelector(getImLayoutState, (state: State) => state.up);
