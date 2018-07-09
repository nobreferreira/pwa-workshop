import { get } from 'lodash';

export const getAllPhotos = state => get(state, 'photos.photosList', []);
