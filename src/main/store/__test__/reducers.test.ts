import { createRootReducer } from '../reducers';

describe('reducers', () => {
  it('should not be crashed', () => {
    createRootReducer();
    expect(true).toBeTruthy();
  });
});
