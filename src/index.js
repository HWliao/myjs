import $ from 'jquery';

console.log($.browser);
const name = '廖红卫';
const html = `<h1>i'm ${name},hello!</h1>`;
const div = document.createElement('div');
div.innerHTML = html;
$(document.body).append(html);

