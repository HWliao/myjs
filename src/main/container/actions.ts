import { createAction, FluxStandardAction } from 'typesafe-actions';

export enum TestActionType {
  TEST_ACTION = '[test] test',
  Test_CLICK_ACTOIN = '[test] click'
}

export type TestAction = FluxStandardAction<TestActionType.TEST_ACTION, number>;

function testActionCF(num: number): TestAction {
  return {
    type: TestActionType.TEST_ACTION,
    payload: num
  };
}

export const testAction = createAction(TestActionType.TEST_ACTION, testActionCF);

export type ClickAction = FluxStandardAction<TestActionType.Test_CLICK_ACTOIN, string>;

function clickActionCF(): ClickAction {
  return {
    type: TestActionType.Test_CLICK_ACTOIN,
    payload: 'click'
  };
}

export const clickAction = createAction(TestActionType.Test_CLICK_ACTOIN, clickActionCF);

export type TestActions = TestAction | ClickAction;
