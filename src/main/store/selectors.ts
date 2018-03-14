import { RootState, RootStateKeys } from './reducers';
import { ImApiState } from '../im-api/reducers';
import { ImRootState } from '../container/reducers';

export function selectMain(state: RootState) {
  return <ImApiState> state.get(RootStateKeys.main);
}

export function selectImRoot(state: RootState) {
  return <ImRootState> state.get(RootStateKeys.component);
}
