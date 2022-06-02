import http from './httpService';

const apiEndpoint = 'users';

export function register(credentials) {
  return http.post(`${apiEndpoint}/signup`, credentials);
}
