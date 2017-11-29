import $ from 'jquery';

const config = {
  debug: true,
  thirdPartyDebug: false,
  appKey: '',
  className: '',
};

export function getConfig(options = {}) {
  return $.extend({}, config, options);
}
