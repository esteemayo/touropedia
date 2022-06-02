import http from './httpService';

const apiEndpoint = 'tours';

const tourUrl = (tourId) => {
  return `${apiEndpoint}/${tourId}`;
};

export function getTours(page) {
  return http.get(`${apiEndpoint}?page=${page}`);
}

export function getToursByUser() {
  return http.get(`${apiEndpoint}/user/user-tours`);
}

export function getToursBySearch(searchQuery) {
  return http.get(`${apiEndpoint}/search/query?searchQuery=${searchQuery}`);
}

export function getTagTours(tag) {
  return http.get(`${apiEndpoint}/tag/${tag}`);
}

export function getRelatedTours(tags) {
  return http.post(`${apiEndpoint}/related-tours`, tags);
}

export function getTourById(tourId) {
  return http.get(`${apiEndpoint}/find/${tourId}`);
}

export function getTourBySlug(slug) {
  return http.get(`${apiEndpoint}/details/${slug}`);
}

export function createTour(tour) {
  return http.post(apiEndpoint, tour);
}

export function updateTour(tourId, tour) {
  return http.patch(tourUrl(tourId), tour);
}

export function likeTour(tourId) {
  return http.patch(`${apiEndpoint}/like/${tourId}`);
}

export function deleteTour(tourId) {
  return http.delete(tourUrl(tourId));
}
