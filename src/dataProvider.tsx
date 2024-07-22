import { DataProvider, fetchUtils } from 'react-admin';

const apiUrl = '/api/biosamples/schema/store/api/v2/';
const httpClient = fetchUtils.fetchJson;

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        // Adjust the URL to point to the right endpoint for lists
        return httpClient(`${apiUrl}${resource}/search`).then(({ json }) => {
            // Extract the embedded resources
            const data = json._embedded?.[resource] || [];
            return {
                data,
                total: json.page?.totalElements || data.length,
            };
        });
    },
    getOne: (resource, params) => {
        // Adjust the URL to point to the right endpoint for a single item
        return httpClient(`${apiUrl}${resource}?id=${params.id}`).then(({ json }) => {
            // Directly use the returned object for the single item
            const data = json; // Assuming json is the schema object itself
            return { data };
        });
    },
    getMany: (resource, params) => {
        return httpClient(`${apiUrl}${resource}/search?id=${params.ids.join(',')}`).then(({ json }) => {
            const data = json._embedded?.[resource] || [];
            return { data };
        });
    },
    getManyReference: (resource, params) => {
        const url = `${apiUrl}${resource}/search?${params.target}=${params.id}`;
        return httpClient(url).then(({ json }) => {
            const data = json._embedded?.[resource] || [];
            return {
                data,
                total: json.page?.totalElements || data.length,
            };
        });
    },
    create: (resource, params) => {
        return httpClient(`${apiUrl}${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },
    update: (resource, params) => {
        const url = `${apiUrl}${resource}?id=${params.id}`;
        return httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        }));
    },
    updateMany: (resource, params) => {
        return httpClient(`${apiUrl}${resource}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: json,
        }));
    },
    delete: (resource, params) => {
        const url = `${apiUrl}${resource}?id=${params.id}`;
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json,
        }));
    },
    deleteMany: (resource, params) => {
        const url = `${apiUrl}${resource}?id=${params.ids.join(',')}`;
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({
            data: json,
        }));
    },
};

export default dataProvider;
