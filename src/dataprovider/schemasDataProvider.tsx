import {DataProvider} from "react-admin";
import config from "../config.tsx";
import {httpClient} from "./authClient.tsx";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);

const idFromAttribute = (attribute: string) => (record) => ({id: record[attribute], ...record})

export const schemasDataProvider: DataProvider = (recordIdProvider) => ({

    getList: (resource:string, params) => {
        const {filter = {}, pagination, sort} = params;

        // Adjust the URL to point to the right endpoint for lists
        let apiResource = resolveApiResource(resource);
        const responseResourceName = apiResource
        const query = new URLSearchParams({
            page: (pagination.page - 1) + '', // react-admin is 1 based, spring is 0 based
            size: pagination.perPage + '',
            sort: `${sort.field},${sort.order}`,
            ...filter
        }).toString();
        let searchResource = '';
        if (Object.keys(filter).length > 0) {
            searchResource = '/search/findByExample'
            apiResource = 'schemas'
        }
        const url = `${apiUrl}${apiResource}${searchResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[responseResourceName] || [];
                data = data.map(recordIdProvider);
                return {
                    data,
                    total: json.page?.totalElements || data.length,
                    pageInfo: {
                        hasNextPage: json?._links?.next || false,
                        hasPreviousPage: json?._links?.prev || false
                    }
                };
            });
    },
    getOne : (resource:string, params) => {
        const {id, meta = {}} = params;
        let searchResource = '';
        const searchParams = new URLSearchParams();

        if (Object.prototype.hasOwnProperty.call(meta, 'searchResource')) {
            searchParams.append('username', id);
            searchResource = `/search/${meta.searchResource}`
        } else {
            searchResource = `/${id}`;
        }
        const query = searchParams.toString();
        return httpClient(`${apiUrl}${resolveApiResource(resource)}${searchResource}?${query}`)
            .then(({json}) => {
                let record = json; // Assuming json is the schema object itself
                record = recordIdProvider(record);
                return {data: record};
            });
    },

    getMany : (resource:string, params) => {
        const {ids, meta = {}} = params;
        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams();
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        searchParams.append('ids', ids);
        if (meta.hasOwnProperty('size')) {
            searchParams.append('size', meta.size)
        }
        const query = searchParams.toString();
        const url = `${apiUrl}${apiResource}/search/findByIdIn?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map(recordIdProvider)
                return {
                    data,
                    total: json.page?.totalElements || data.length,
                    pageInfo: {
                        hasNextPage: json?._links?.next || false,
                        hasPreviousPage: json?._links?.prev || false
                    }
                };
            });
    },
    getManyReference : (resource) => Promise.reject(`${resource} getManyReference not implemented`),
    create:  async (resource, params) => {
        const apiResource = resolveApiResource(resource);
        const url = `${apiUrl}${apiResource}`;
        const {json} = await httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });

        return ({
            data: {...params.data, id: json.id},
        });
    },
    update: async (resource, params) => {
        const {id} = params;
        const apiResource = resolveApiResource(resource);
        const url = `${apiUrl}${apiResource}/${id}`;
        const {json} = await httpClient(url, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });

        return ({
            data: {...params.data, id: json.id},
        });
    },
    updateMany: (resource) => Promise.reject(`${resource} updateMany not implemented`),
    deleteMany: (resource) => Promise.reject(`${resource} delete not implemented`),
    getAttributeValues: (resource: string, attributeName: string) => {
        const apiResource = 'schemas';
        const responseResourceName = apiResource;
        const query = {
            attributeName
        };
        const queryString = new URLSearchParams(query).toString();
        const searchResource: string = '/search/findAttributeValues';
        const url = `${apiUrl}${apiResource}${searchResource}?${queryString}`;
        return httpClient(url)
            .then(({json}) => {
                let data = json._embedded?.[responseResourceName] || Array.isArray(json) ? json : [];
                data = data.map(idFromAttribute('attributeName'));
                return {
                    data,
                    total: json.page?.totalElements || data.length,
                    pageInfo: {
                        hasNextPage: json?._links?.next || false,
                        hasPreviousPage: json?._links?.prev || false
                    }
                };
            });

    }
});
