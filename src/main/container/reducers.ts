import { Map } from 'immutable';
import { TestActions, TestActionType } from './actions';

export enum TestStateKeys {
  id = 'id',
  test = 'test'
}

export type TestState = Map<TestStateKeys, any>;

const initState = Map<TestStateKeys, any>({id: 'lhw'});

export default function testReducer(state: TestState = initState, action: TestActions): TestState {
  if (action.type === TestActionType.TEST_ACTION) {
    return state.set(TestStateKeys.id, `lhw${action.payload}`);
  } else if (action.type === TestActionType.Test_CLICK_ACTOIN) {
    return state.set(TestStateKeys.id, action.payload);
  }
  return state;
}
