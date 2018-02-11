import { AppActions, AppDestroyAction, AppInitAction } from './app.actions';

describe('AppInitAction', () => {
  it('should have type APP_INIT', () => {
    const action = new AppInitAction();
    expect(action).toBeTruthy();
    expect(action.type).toBe(AppActions.APP_INIT);
  });
});

describe('AppDestroyAction', () => {
  it('should have type APP_DESTROY', () => {
    const action = new AppDestroyAction();
    expect(action).toBeTruthy();
    expect(action.type).toBe(AppActions.APP_DESTROY);
  });
});
