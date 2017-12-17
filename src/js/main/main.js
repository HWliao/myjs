import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

export function start() {
  const div = document.createElement('div');
  document.body.appendChild(div);
  ReactDOM.render(<App/>, div);
}
