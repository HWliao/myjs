import { initialState, reducer } from './config.reducer';
import { ConfigSetAction } from '../actions/config.actions';

describe('Config Reducer', () => {
  describe('unknow action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('config set action', () => {
    it('should override the result state', () => {
      const action = new ConfigSetAction({ appKey: 'test' });
      const result = reducer(initialState, action);
      Object.keys(action.payload).forEach((key) => {
        expect(result[key]).toBe(action.payload[key]);
      });
    });
  });
});
