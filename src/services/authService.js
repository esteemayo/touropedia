import http from './httpService';

const tokenKey = 'token';
const apiEndpoint = 'auth';

export function login(credentials) {
  return http.post(`${apiEndpoint}/signin`, credentials);
}

export function googleLogin(result) {
  return http.post(`${apiEndpoint}/google-signin`, result);
}

export function getJWT() {
  return localStorage.getItem(tokenKey);
}
