import { LAYOUT_SMALL, LAYOUT_LARGE, LAYOUT_MEDIUM, createAction } from './action';

function layoutToSmall() {
  return createAction(LAYOUT_SMALL, 'samll');
}

function layoutToLarge() {
  return createAction(LAYOUT_LARGE, 'large');
}

function layoutToMedium() {
  return createAction(LAYOUT_MEDIUM, 'medium');
}

export function intervalChangeLayout() {
  return (dispatch) => {
    let i = 0;
    setInterval(() => {
      i += 1;
      if (i % 3 === 0) {
        dispatch(layoutToMedium());
      } else if (i % 3 === 1) {
        dispatch(layoutToSmall());
      } else {
        dispatch(layoutToLarge());
      }
    }, 1000);
  };
}
