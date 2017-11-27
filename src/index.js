import $ from 'jquery';

import { Im } from './main';

$(document.body).append(`<h1>${Im.test}</h1>`);
const im = new Im();
im.on('test', data => console.log(data));
