import {DataProvider, fetchUtils} from "react-admin";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";
import config from "../config.tsx";
import {ChecklistProps} from "../model/Checklist.tsx";

const apiUrl = fixTrailingSlash(config.SCHEMA_STORE_URL);
const httpClient = fetchUtils.fetchJson;

const recordToId = (record: ChecklistProps) => ({
    id: `${record.name}:${record.version}`,
    ...record
});
export const schemasDataProvider: DataProvider = {

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
    getMany: (resource, params) => Promise.reject('schema getMany not implemented'),
    getManyReference: (resource, params) => Promise.reject('schema getManyReference not implemented'),
    create: (resource, params) => {
        return Promise.reject('schema create not implemented');
    },
    update: (resource, params) => {
        debugger;
        return Promise.reject('schema update not implemented');
    },
    updateMany: (resource, params) => Promise.reject('schema updateMany not implemented'),
    deleteMany: (resource, params) => Promise.reject('schema delete not implemented'),
};
