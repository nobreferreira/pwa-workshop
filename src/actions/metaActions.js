import {
    SHOW_FORM,
    HIDE_FORM,
    NETWORK_OFFLINE,
    NETWORK_ONLINE
} from './index';

export const showForm = () => ({
    type: SHOW_FORM
});

export const hideForm = () => ({
    type: HIDE_FORM
});

export const networkOffline = () => ({
    type: NETWORK_OFFLINE
});

export const networkOnline = () => ({
    type: NETWORK_ONLINE
});
