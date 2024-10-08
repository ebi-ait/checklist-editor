// This data provider handles fields
import {DataProvider, fetchUtils} from "react-admin";
import config from "../config.tsx";
import {FieldProps} from "../model/Field.tsx";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);
const httpClient = fetchUtils.fetchJson;

const addIdFromSelfLink = (record: FieldProps, apiResource: string) => ({
    id: `${record.name}:${record.version}`,
    ...record
});
export const fieldsDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort} = params;

        const query = new URLSearchParams({
            ...filter.q ? {text: filter.q} : {}, // Add the 'text' parameter if 'q' is provided
            page: (pagination.page - 1)+''    , // react-admin is 1 based, spring is 0 based
            size: pagination.perPage+'',
            sort: `${sort.field},${sort.order}`,
        }).toString();
        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resolveApiResource(resource);
        let searchResource = '';
        if(filter.q) {
            searchResource = '/search/findAllByTextPartial'
        }
        const url = `${apiUrl}${apiResource}${searchResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map(record => addIdFromSelfLink(record, apiResource));
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
    getOne: (resource, params) => {
        const apiResource = resolveApiResource(resource);
        return httpClient(`${apiUrl}${resolveApiResource(resource)}/${params.id}`)
            .then(({json}) => {
                let data = json; // Assuming json is the schema object itself
                data = addIdFromSelfLink(data, apiResource);
                return {data};
            });
    },
    getMany: (resource, params) => {
        const {ids, meta={}  } = params;
        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams();
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        searchParams.append('ids', ids);
        if(meta.hasOwnProperty('size')) {
            searchParams.append('size', meta.size)
        }
        const query = searchParams.toString();
        const url = `${apiUrl}${apiResource}/search/findAllByIdIn?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map((record: FieldProps) => addIdFromSelfLink(record, apiResource))
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
    getManyReference: (resource, params) => {
        const {id, target} = params;
        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams();
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        searchParams.append(target, id);
        const query = searchParams.toString();
        let searchResource = '/search/findByUsedBySchemas';
        const url = `${apiUrl}${apiResource}${searchResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map((record: FieldProps) => addIdFromSelfLink(record, apiResource))
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
    create: async (resource, params) => {

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
    updateMany: (resource, params) => {

        return Promise.reject('field updateMany not implemented');
    },
    deleteMany: (resource, params) => Promise.reject('field delete not implemented'),
}


