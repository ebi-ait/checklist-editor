import {fetchUtils} from "react-admin";

export const httpClient = (url, options = {}) => {
    // Ensure headers object exists
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }

    // Add Authorization header with the JWT token
    const token = localStorage.getItem('jwt_token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }

    // Use the default fetchUtils fetchJson function
    return fetchUtils.fetchJson(url, options);
};
