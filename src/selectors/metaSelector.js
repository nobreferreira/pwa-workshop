import { get } from 'lodash';

export const getShowForm = state => get(state, 'meta.showForm', false);
export const getIsLoading = state => get(state, 'meta.isLoading', false);
export const getIsOnline = state => get(state, 'meta.isOnline', true);
