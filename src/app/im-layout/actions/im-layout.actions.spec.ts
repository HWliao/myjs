import {
  ImLayoutActions, ImLayoutDownAction, ImLayoutHideAction, ImLayoutShowAction,
  ImLayoutUpAction
} from './im-layout.action';

describe('ImLayoutActions', () => {
  describe('ImLayoutShowAction', () => {
    it('should have type IM_LAYOUT_SHOW', () => {
      const action = new ImLayoutShowAction();
      expect(action.type).toBe(ImLayoutActions.IM_LAYOUT_SHOW);
    });
  });
  describe('ImLayoutHideAction', () => {
    it('should have type IM_LAYOUT_HIDE', () => {
      const action = new ImLayoutHideAction();
      expect(action.type).toBe(ImLayoutActions.IM_LAYOUT_HIDE);
    });
  });
  describe('ImLayoutUpAction', () => {
    it('should have type IM_LAYOUT_UP', () => {
      const action = new ImLayoutUpAction();
      expect(action.type).toBe(ImLayoutActions.IM_LAYOUT_UP);
    });

  });
  describe('ImLayoutDownAction', () => {
    it('should have type IM_LAYOUT_DOWN', () => {
      const action = new ImLayoutDownAction();
      expect(action.type).toBe(ImLayoutActions.IM_LAYOUT_DOWN);
    });
  });
});
