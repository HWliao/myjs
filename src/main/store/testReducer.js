import { LAYOUT_SMALL, LAYOUT_LARGE, LAYOUT_MEDIUM } from './action';

export function layout(clazz = 'small', action) {
  switch (action.type) {
    case LAYOUT_SMALL:
    case LAYOUT_MEDIUM:
    case LAYOUT_LARGE:
      return action.payload;
    default:
      return clazz;
  }
}
