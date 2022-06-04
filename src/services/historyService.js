import http from './httpService';

const apiEndpoint = 'histories';

export function getHistoriesOnTour(tourId) {
  return http.get(`${apiEndpoint}/tour/${tourId}`);
}

export function createHistory(tour) {
  return http.post(apiEndpoint, tour);
}
