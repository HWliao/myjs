import * as ImRootActions from '../actions/im-root.actions';

export interface State {
  isInited: boolean;
}

const initialState: State = {
  isInited: false
};

export function reducer(state: State = initialState, action: ImRootActions.Actions): State {
  switch (action.type) {
    case ImRootActions.ImRootActions.ImRootInitAction:
      return { isInited: true };
    case ImRootActions.ImRootActions.ImRootDestroyAction:
      return { isInited: false };
    default:
      return state;
  }
}

export const isInited = (state: State) => state.isInited;
