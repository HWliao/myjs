import { ImRootActionType, imRootDestroyAction, imRootInitAction } from '../actions';

describe('im root actions', () => {
  it('should return ImRootInitAction', () => {
    expect(imRootInitAction()).toEqual({type: ImRootActionType.init});
  });

  it('should return ImRootDestroyAction', () => {
    expect(imRootDestroyAction()).toEqual({type: ImRootActionType.destroy});
  });
});
