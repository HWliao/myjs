import $ from 'jquery';
import { createStore } from 'redux';

import { Im } from './main';

console.log(createStore(() => {
}));
$(document.body).append(`<h1>${Im.test}</h1>`);
const im = new Im();
im.on('test', data => console.log(data));
