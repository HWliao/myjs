import { applyMiddleware, compose, createStore, Middleware } from 'redux';
import { createRootReducer, RootStateKeys } from './reducers';
import { Map } from 'immutable';
import { createEpicMiddleware } from 'redux-observable';
import { createRootEpic } from './epics';

const initState = Map<RootStateKeys, any>({});

const rootReducer = createRootReducer();

const middlewares: Middleware[] = [
  createEpicMiddleware(createRootEpic())
];

const enhancers = [applyMiddleware(...middlewares)];

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export function storeConfigure() {
  return createStore(rootReducer, initState, composeEnhancers(...enhancers));
}
