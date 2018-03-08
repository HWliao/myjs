import {
  ImLayoutActionType,
  imLayoutDownAction,
  imLayoutHideAction,
  imLayoutShowAction,
  imLayoutUpAction
} from '../actions';

describe('im layout actions', () => {

  it('should create show action', () => {
    const action = imLayoutShowAction();
    expect(action.type).toBe(ImLayoutActionType.show);
    expect(action.payload).toBeTruthy();
  });

  it('should create hide action', () => {
    const action = imLayoutHideAction();
    expect(action.type).toBe(ImLayoutActionType.hide);
    expect(action.payload).toBeFalsy();
  });

  it('should create up action', () => {
    const action = imLayoutUpAction();
    expect(action.type).toBe(ImLayoutActionType.up);
    expect(action.payload).toBeTruthy();
  });

  it('should create show action', () => {
    const action = imLayoutDownAction();
    expect(action.type).toBe(ImLayoutActionType.down);
    expect(action.payload).toBeFalsy();
  });
});
