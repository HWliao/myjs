import { ImSidebarActionType, imSidebarClickHeaderAction } from '../actions';

describe('im sidebar actions', () => {
  describe('ImSidebarClickHeaderAction', () => {
    it('should return ImSidebarClickHeaderAction instance', () => {
      const action = imSidebarClickHeaderAction(true);
      expect(action).toEqual({
        type: ImSidebarActionType.clickHeader,
        payload: true
      });
    });
  });
});
