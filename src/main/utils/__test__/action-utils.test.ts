import { createActionCFWithJustType } from '../action-utils';

describe('action-utils', () => {
  it('createActionCFWithJustType', () => {
    const type: string = 'test';
    const action = createActionCFWithJustType(type)();
    expect(action.type).toEqual(type);
  });
});
