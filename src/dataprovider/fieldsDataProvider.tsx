// This data provider handles fields
import {DataProvider, fetchUtils, SortPayload} from "react-admin";
import config from "../config.tsx";
import {FieldProps} from "../model/Field.tsx";
import {httpClient} from "./authClient.tsx";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);

const recordToId = (record: FieldProps) => ({
    id: `${record.name}:${record.version}`,
    ...record
});

const idFromAttribute = (attribute: string) => (record) => ({id: record[attribute], ...record})
export const fieldsDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort, meta} = params;

        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resolveApiResource(resource);
        const responseResourceName = apiResource
        const query = {
            page: (pagination.page - 1) + '', // react-admin is 1 based, spring is 0 based
            size: pagination.perPage + '',
            sort: (meta.sort ?? [sort]).map((s: SortPayload) => `${s.field},${s.order}`),
            ...filter
        };
        if (Object.prototype.hasOwnProperty.call(meta, 'latest')) {
            query.latest = meta.latest;
        }
        const queryString = new URLSearchParams(query).toString();
        // Adjust the URL to point to the right endpoint for lists
        let searchResource = '';
        if (Object.keys(filter).length > 0) {
            searchResource = '/search/findByExample'
        }
        const url = `${apiUrl}${apiResource}${searchResource}?${queryString}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[responseResourceName] || [];
                data = data.map(recordToId);
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
        return httpClient(`${apiUrl}${apiResource}/${params.id}`)
            .then(({json}) => {
                let data = json; // Assuming json is the schema object itself
                data = recordToId(data);
                return {data};
            });
    },
    getMany: (resource, params) => {
        const {ids, meta = {}} = params;
        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams();
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        let searchResource = '';
        if (Object.prototype.hasOwnProperty.call(meta, 'parentId')) {
            searchParams.append('schemaId', meta.parentId);
            searchResource = '/search/findByUsedBySchemas'
        } else {
            searchParams.append('ids', ids);
            searchResource = '/search/findAllByIdIn'
        }
        if (Object.prototype.hasOwnProperty.call(meta, 'size')) {
            searchParams.append('size', meta.size)
        }
        if (Object.prototype.hasOwnProperty.call(meta, 'latest')) {
            searchParams.append('latest', meta.latest)
        }
        const query = searchParams.toString();
        const url = `${apiUrl}${apiResource}${searchResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map(recordToId)
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
        const {id, target, pagination} = params;
        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams(
            {
                page: (pagination.page - 1) + '', // react-admin is 1 based, spring is 0 based
                size: pagination.perPage + '',
            }
        );
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
                data = data.map(recordToId)
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
    updateMany: (resource, params) => Promise.reject(`${resource} updateMany not implemented`),
    deleteMany: (resource, params) => Promise.reject(`${resource} delete not implemented`),
    getAttributeValues: (resource: string, attributeName: string) => {
        const apiResource = resolveApiResource(resource);
        const responseResourceName = apiResource
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


};
