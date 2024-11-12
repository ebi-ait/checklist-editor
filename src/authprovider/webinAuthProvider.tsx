import {jwtDecode} from 'jwt-decode';
import {fetchUtils} from 'react-admin';
const httpClient = fetchUtils.fetchJson;


const url = '/auth';
const authProvider = {
    login: async ({ username, password }) => {

        const request = new Request(url+'/token', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ username: username, password: password, authRealms: ["ENA"]}),

        });

        const response = await fetchUtils.fetchJson(request);

        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.body);
        }

        localStorage.setItem('jwt_token', response.body);  // Store the token in localStorage


        return Promise.resolve();
    },


    logout: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('principal');  // Remove principal as well
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = localStorage.getItem('jwt_token');
        if (!token) {
            return Promise.reject();
        }

        try {
            // Decode the token and destructure to get the principal and exp
            const { exp } = jwtDecode(token);

            // Check if the token has expired
            if (exp * 1000 < Date.now()) {
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('principal');
                return Promise.reject();  // Reject if token is expired
            }

            return Promise.resolve();  // Token is valid
        } catch (error) {
            // Handle any errors in decoding or invalid token structure
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('principal');
            return Promise.reject();  // Reject if the token is invalid
        }
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('principal');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),

    getIdentity: () => {
        try {
            const token = localStorage.getItem('jwt_token');
            if (token) {
                // Decode the token and destructure to get the principal
                const { principal } = jwtDecode(token);
                // Return the principal as part of the user identity
                return Promise.resolve({ id: principal.id, fullName: principal.name });
            }
            return Promise.reject();
        } catch (error) {
            return Promise.reject();
        }
    },
};

export default authProvider;
