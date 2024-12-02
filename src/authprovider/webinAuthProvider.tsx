import {jwtDecode} from 'jwt-decode';
import {UserIdentity} from "ra-core/dist/cjs/types";
import {fetchUtils} from 'react-admin';
import config from "../config.tsx";

const httpClient = fetchUtils.fetchJson;
const apiUrl = `${config.AUTH_API_URL}`;


interface Authority {
    authority: string;
}
interface UserInfo extends UserIdentity {
    authorities: Authority[];
    firstName: string;
    lastName: string;
}
type CanAccessParams = {
    action: string;
    resource: string;
    record?: any;
};

const accessControlStrategies = {
    reader: ({ resource, action }) => {
        return ['checklists', 'fields', 'ontologies'].includes(resource)
            && ['list', 'show'].includes(action);
    },
    editor: ({ resource, action }) => {
        return ['checklists', 'fields'].includes(resource)
            && ['create', 'edit'].includes(action) ;
    },
    admin: ({ resource, action }) => {
        return ['users'].includes(resource)
            && ['list', 'show', 'create', 'edit'].includes(action);
    },
}

const authProvider = {
    login: async ({username, password}) => {
        const tokenRequest = {username: username, password: password, authRealms: ["ENA"]};
        const url = apiUrl + '/token';
        const response = await httpClient(url, {
            method: 'POST',
            headers: new Headers([
                ['Content-Type', 'application/json'],
            ]),
            body: JSON.stringify(tokenRequest),
        })
        const jwt_token = response.body;
        localStorage.setItem('jwt_token', jwt_token);
        console.log(`jwt_token: ${jwt_token}`)
        return Promise.resolve();
    },


    getIdentity: async () => {
        try {
            const token = localStorage.getItem('jwt_token') ?? '';
            const response = await httpClient(config.SCHEMA_STORE_URL + '/users/search/me', {
                headers: new Headers([
                    ['Content-Type', 'application/json'],
                    ['Authorization', `Bearer ${token}`],
                ]),
            })
            const userInfoJson: UserInfo = response.json;
            userInfoJson.authorities
            const userInfo: UserInfo = {
                id: userInfoJson.username,
                fullName: `${userInfoJson.firstName} ${userInfoJson.lastName}`,
                authorities: userInfoJson.authorities
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return Promise.resolve(userInfo);
        } catch (error) {
            return Promise.reject();
        }
    },

    canAccess: async ({action, record, resource}: CanAccessParams): Promise<boolean> => {

        const userInfo: UserInfo = JSON.parse(localStorage.getItem('userInfo'));
        const permissions = userInfo.authorities;
        return permissions
            .some(authority => accessControlStrategies[authority.authority]({resource, action}));
    },

    getPermissions: () => {
        const userInfo:UserInfo = JSON.parse(localStorage.getItem('userInfo'));
        return userInfo.authorities;
    },

    checkAuth: () => {
        const token = localStorage.getItem('jwt_token');
        console.log(`token: ${token}`)
        if (!token) {
            return Promise.reject();
        }

        try {
            // Decode the token and destructure to get the principal and exp
            const {exp} = jwtDecode(token);
            console.log(`exp: ${exp}`)
            // Check if the token exp expired
            if (exp * 1000 < Date.now()) {
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('userInfo');
                return Promise.reject();  // Reject if token is expired
            }

            return Promise.resolve();  // Token is valid
        } catch (error) {
            // Handle any errors in decoding or invalid token structure
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('userInfo');
            return Promise.reject();  // Reject if the token is invalid
        }
    },

    logout: () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('userInfo');
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        console.log(`error: ${error}`)
        if (status === 401 || status === 403) {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('userInfo');
            return Promise.reject();
        }
        return Promise.resolve();
    },
};

export default authProvider;
