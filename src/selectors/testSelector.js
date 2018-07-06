import { get } from 'lodash';

export const getAllTest = state => get(state, 'test.test', []);
