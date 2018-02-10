import { ActionReducer, ActionReducerMap, MetaReducer, Selector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { AppActions, AppDestroyAction, AppInitAction } from '../actions/app.actions';

export interface State {
  inited: boolean;
}

export const reducers: ActionReducerMap<State> = {
  inited: (state = false, action: AppInitAction | AppDestroyAction): boolean => {
    switch (action.type) {
      case AppActions.APP_INIT:
        return true;
      case AppActions.APP_DESTROY:
        return false;
      default:
        return state;
    }
  }
};

function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function (state: State, action: any): State {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze, logger] : [];
/**
 * 获取app 初始化状态
 * @param {State} state
 * @return {boolean}
 */
export const getInitedState: Selector<State, boolean> = (state: State) => state.inited;
