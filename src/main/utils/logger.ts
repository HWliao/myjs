// Avoid `console` errors in browsers that lack a console.
const noop = () => {
  // empty method
};
const methods = [
  'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
  'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
  'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
  'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn',
];
let {length} = methods;
const {console} = window;

// eslint-disable-next-line no-plusplus
while (length--) {
  // Only stub undefined methods.
  if (!console[methods[length]]) {
    console[methods[length]] = noop;
  }
}
export const logger = {
  warn: (...args: any[]) => console.warn(...args)
};
