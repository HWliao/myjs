import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

import Im from './main/main';

const options = {
  className: 'my-class',
  debug: true,
  thirdPartyDebug: false,
};

$('#init').on('click', () => {
  // eslint-disable-next-line no-new
  new Im(options);
});
