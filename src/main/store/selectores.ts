import { RootState, RootStateKeys } from './reducers';

export const selectTest = (state: RootState) => state.get(RootStateKeys.test);
