import http from './httpService';

const apiEndpoint = 'bookmarks';

const boomarkUrl = (bookmarkId) => `${apiEndpoint}/${bookmarkId}`;

export const getOneBookmark = (tourId) =>
  http.get(`${apiEndpoint}/tour/${tourId}`);

export const createBookmark = (tour) => http.post(apiEndpoint, tour);

export const deleteBookmark = (bookmarkId) =>
  http.delete(boomarkUrl(bookmarkId));
