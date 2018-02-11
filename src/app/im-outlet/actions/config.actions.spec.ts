import { ConfigActions, ConfigSetAction } from './config.actions';
import * as ConfigState from '../reducers/config.reducer';

describe('ConfigSetAction', () => {
  const payload: ConfigState.State = { className: 'test' };
  let action;
  beforeEach(() => {
    action = new ConfigSetAction(payload);
  });

  it('should create a instance', () => {
    expect(action).toBeTruthy();
  });

  it('should have type CONFIG_SET', () => {
    expect(action.type).toBe(ConfigActions.CONFIG_SET);
  });

  it('should have payload to be test payload', () => {
    Object.keys(payload).forEach((key) => {
      expect(action.payload[key]).toBe(payload[key]);
    });
  });
});
