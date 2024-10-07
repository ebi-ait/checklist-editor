import {DataProvider, fetchUtils} from "react-admin";
import config from "../config.tsx";
import {ChecklistProps} from "../model/Checklist.tsx";
import {FieldProps} from "../model/Field.tsx";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);
const httpClient = fetchUtils.fetchJson;

const recordToId = (record: ChecklistProps, apiResource: string) => ({
    id: `${record.accession}:${record.version}`,
    ...record
});

export const schemasDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort} = params;

        // Adjust the URL to point to the right endpoint for lists
        let apiResource = resolveApiResource(resource);
        const responseResourceName = apiResource
        const query = new URLSearchParams({
            ...filter.q ? {text: filter.q} : {}, // Add the 'text' parameter if 'q' is provided
            page: (pagination.page - 1)+'', // react-admin is 1 based, spring is 0 based
            size: pagination.perPage+'',
            sort: `${sort.field},${sort.order}`,
            ...filter
        }).toString();
        let searchResource = '';
        if(Object.keys(filter).length>0) {
            if(filter.q) { // it's a text search
                searchResource = '/search/findAllByTextPartial'
            } else { // it's a regular attribute search
                searchResource = '/search/findByExample'
                apiResource = 'schemas'
            }
        }
        const url = `${apiUrl}${apiResource}${searchResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[responseResourceName] || [];
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
    getOne: (resource, params) => {
        return httpClient(`${apiUrl}${resolveApiResource(resource)}/${params.id}`)
            .then(({json}) => {
                let data = json; // Assuming json is the schema object itself
                data = recordToId(data);
                return {data};
            });
    },
    getMany: (resource, params) => {
        const {ids} = params;

        const apiResource = resolveApiResource(resource);
        const searchParams = new URLSearchParams();
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        searchParams.append('ids', ids);
        const query = searchParams.toString();
        const url = `${apiUrl}${apiResource}/search/findByIdIn?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map((record: FieldProps) => recordToId(record, apiResource))
                return {
                    data,
                    total: json.page?.totalElements || data.length,
                    pageInfo: {
                        hasNextPage: json?._links?.next || false,
                        hasPreviousPage: json?._links?.prev || false
                    }
                };
            });    },
    getManyReference: (resource, params) => Promise.reject('schema getManyReference not implemented'),
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
        const {id} = params, apiResource = resolveApiResource(resource),
            url = `${apiUrl}${apiResource}/${id}`, {json} = await httpClient(url, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });

        return ({
            data: {...params.data, id: json.id},
        });
    },
    updateMany: (resource, params) => Promise.reject('schema updateMany not implemented'),
    deleteMany: (resource, params) => Promise.reject('schema delete not implemented'),
};
