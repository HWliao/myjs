import { createSelector } from 'reselect';
import { TestState, TestStateKeys } from './reducers';
import { BaseState } from '../../store/reducers';

export const makeSelectTestId = createSelector(
  (state: BaseState) => state.get('test'),
  (state: TestState) => state.get(TestStateKeys.id)
);
