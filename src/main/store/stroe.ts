import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { applyMiddleware, compose, createStore, Middleware, Store } from 'redux';
import { BaseState, createRootReducer } from './reducers';
import { createEpicMiddleware } from 'redux-observable';
import { createRootEpic, EpicsDependencies } from './epics';
import { fromJS } from 'immutable';

/**
 * 配置一个store
 * @returns Store
 */
export function storeConfigure(dependencies: EpicsDependencies): Store<BaseState> {
  // 创建一个初始化值
  const initState = fromJS({});
  // 创建一个根reducer
  const rootReducer = createRootReducer();
  // 创一个epic中间件
  const epicMiddleware = createEpicMiddleware(createRootEpic(), {dependencies});
  // 中间集合
  const middlewares: Middleware[] = [
    epicMiddleware
  ];
  // 增强集合
  const enhancers = [applyMiddleware(...middlewares)];
  // 根据环境确定是否使用redux-devtool
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  // 创建一个新的store
  const store = createStore(rootReducer, initState, composeEnhancers(...enhancers));

  // 依赖组件中加入store依赖
  for (let x in dependencies) {
    if (dependencies[x] && typeof dependencies[x].setStore === 'function') {
      dependencies[x].setStore(store);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    // 开发环境下的热加载先关
    if (module.hot) {
      module.hot.accept('./epics', () => {
        epicMiddleware.replaceEpic(createRootEpic());
      });
    }
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        store.replaceReducer(createRootReducer());
      });
    }
  }
  return store;
}
