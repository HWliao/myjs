import { Action, applyMiddleware, combineReducers, compose, createStore, Reducer, ReducersMapObject } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface State {
  test?: State1;
}

interface State1 {
  id: string;
}

class TestAction implements Action {
  readonly type = '[test] test';
  num: number;

  constructor(num: number = 0) {
    this.num = num;
  }
}

const initState: State = {};

const reducer: Reducer<State1> = (state: State1 = {id: 'lhw'}, action: TestAction) => {
  if (action.type === '[test] test') {
    return {id: `lhw${action.num}`};
  }
  return state;
};

const reducers: ReducersMapObject = {
  test: reducer
};

const rootReducer = combineReducers<State>(reducers);

const composeEnhancers = process.env.NODE_ENV === 'production' ? compose : composeWithDevTools({});

export const store = createStore(rootReducer, initState, composeEnhancers(applyMiddleware()));

export function doAction(num: number = 0) {
  store.dispatch({
    type: '[test] test',
    num: num
  });
}

let i: number = 0;
setInterval(() => doAction(++i), 1000);
