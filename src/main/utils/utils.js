/**
 * 闪动某个元素
 * @param $el
 * @param ms
 * @return {Object}
 */
export function flashing($el, ms) {
  let i = 0;
  return {
    $el,
    interval: setInterval(() => {
      if (i % 2 === 0) {
        $el.css({ visibility: 'visible' });
      } else {
        $el.css({ visibility: 'hidden' });
      }
      i += 1;
    }, ms),
  };
}

/**
 * 清除闪动
 * @param obj
 */
export function clearFlashing(obj) {
  if (!obj) return;
  const { $el, interval } = obj;
  if ($el) {
    $el.css({ visibility: 'visible' });
  }
  if (interval) {
    clearInterval(interval);
  }
}
