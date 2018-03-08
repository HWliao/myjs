import { createSelector } from 'reselect';
import { selectTest } from '../../store/selectores';
import { TestState, TestStateKeys } from './reducers';

export const makeSelectTestId = createSelector(selectTest, (state: TestState) => state.get(TestStateKeys.id));
