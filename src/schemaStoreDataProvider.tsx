import {DataProvider, fetchUtils} from 'react-admin';

import config from './config'
import {ChecklistProps} from "./model/Checklist.tsx";
import {FieldProps} from "./model/Field.tsx";

function fixTrailingSlash(url: string) {
    return url + (url.at(-1) != '/' ? '/' : '');
}

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);
console.log(`apiUrl: ${apiUrl}`);
const httpClient = fetchUtils.fetchJson;

const resourceMap: { [k: string]: string } = {
    checklists: 'mongoJsonSchemas',
};

function resolveApiResource(resource: string) {
    return resourceMap?.[resource] || resource;
}

const recordToId = (record: ChecklistProps) => record.id = `${record.name}:${record.version}`;

const schemasDataProvider: DataProvider = {

    getList: (resource, params) => {

        const {filter = {}, pagination, sort} = params;
        const query = new URLSearchParams({
            // ...filter.q ? {text: filter.q} : {}, // Add the 'text' parameter if 'q' is provided
            number: pagination.page - 1, // react-admin is 1 based, spring is 0 based
            size: pagination.perPage,
            sort: sort.field,
            order: sort.order,
        }).toString();
        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resolveApiResource(resource);
        const url = `${apiUrl}${apiResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data.map(recordToId)
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
                const data = json; // Assuming json is the schema object itself
                return {data};
            });
    },
    getMany: (resource, params) => Promise.reject('not implemented'),
    getManyReference: (resource, params) => Promise.reject('not implemented'),
    create: (resource, params) => {
        return Promise.reject('not implemented');
    },
    update: (resource, params) => Promise.reject('not implemented'),
    updateMany: (resource, params) => Promise.reject('not implemented'),
    deleteMany: (resource, params) => Promise.reject('not implemented'),
};

// This data provider handles fields
const fieldsDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort} = params;

        const query = new URLSearchParams({
            ...filter.q ? {text: filter.q} : {}, // Add the 'text' parameter if 'q' is provided
            number: pagination.page - 1, // react-admin is 1 based, spring is 0 based
            size: pagination.perPage,
            sort: sort.field,
            order: sort.order,
        }).toString();
        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resolveApiResource(resource);
        const url = `${apiUrl}${apiResource}?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
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
        const searchParams = new URLSearchParams()
        searchParams.append(target,id);
        const query = searchParams.toString();
        const url = `${apiUrl}${apiResource}/search/findByUsedBySchemas?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = json._embedded?.[apiResource] || [];
                data = data.map((record:FieldProps)=>({id:record.name,...record}))
                debugger;
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
}

const dataProviderRegistry: { [k: string]: DataProvider } = {
    'checklists': schemasDataProvider,
    'fields': fieldsDataProvider
};
const callDataProviderFunction = function (resource: string, list: string, params) {
    if (Object.prototype.hasOwnProperty.call(dataProviderRegistry, resource)) {
        return dataProviderRegistry[resource]?.[list](resource, params);
    } else {
        return Promise.reject(`invalid resource for data provider: ${resource}`);
    }
}
const schemaStoreDataProvider: DataProvider = {
    getList: (resource, params) => callDataProviderFunction(resource, 'getList', params),
    getOne: (resource, params) => callDataProviderFunction(resource, 'getOne', params),
    getMany: (resource, params) => callDataProviderFunction(resource, 'getMany', params),
    getManyReference: (resource, params) => callDataProviderFunction(resource, 'getManyReference', params),
    create: (resource, params) => callDataProviderFunction(resource, 'create', params),
    update: (resource, params) => callDataProviderFunction(resource, 'update', params),
    updateMany: (resource, params) => callDataProviderFunction(resource, 'updateMany', params),
    deleteMany: (resource, params) => callDataProviderFunction(resource, 'deleteMany', params),
}
export default schemaStoreDataProvider;
