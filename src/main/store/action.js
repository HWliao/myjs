import { createAction, LOGIN, LOGOUT } from '../model/action';

export function login(userAccount) {
  return createAction(LOGIN, userAccount);
}

export function logout() {
  return createAction(LOGOUT, {});
}
