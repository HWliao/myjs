import { ImApiActionType, imApiSetConfigAction } from '../actions';
import { ConfigModel } from '../model/config.model';

describe('im api actions', () => {
  it('should return ImApiSetConfigAction', () => {
    const config: ConfigModel = {};
    const action = imApiSetConfigAction(config);
    expect(action.type).toBe(ImApiActionType.setConfig);
    if (action.payload) {
      expect(action.payload.toJS()).toEqual(config);
    }
  });
});
