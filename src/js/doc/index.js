import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { start } from '../main/main';

const el = document.getElementById('start');
el.addEventListener('click', () => {
  start();
}, false);
