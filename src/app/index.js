import './style.css';
import printMe from './print';
import { cube } from './util.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  cube(6);
  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = 'Hello webpack';
  element.classList.add('hello');

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

