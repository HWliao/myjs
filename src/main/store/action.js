import { createAction, LOGIN, LOGOUT } from '../model/action';

export function login() {
  return createAction(LOGIN, true);
}

export function logout() {
  return createAction(LOGOUT, false);
}
