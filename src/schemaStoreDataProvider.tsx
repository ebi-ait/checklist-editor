import {DataProvider, fetchUtils, GetListResult} from 'react-admin';

const apiUrl = '/api/biosamples/schema/store/api/v2/';
const httpClient = fetchUtils.fetchJson;

const resourceMap = {
    checklists: 'schemas',
};

function throwNotImplmentedError(resource: string, functionName: string) {
    const errMsg = `${functionName}(${resource}) not implemented`;
    console.error(errMsg);
    throw new Error(errMsg)
}

function filterBSDChecklists(data) {
    return data.filter(checklist => !checklist.accession.startsWith('BSD'))
}

const schemaStoreDataProvider: DataProvider = {
    getList: (resource, params) => {
        const { filter = {}, pagination, sort } = params;

        const query = new URLSearchParams({
            ...filter.q ? { text: filter.q } : {}, // Add the 'text' parameter if 'q' is provided
            number: pagination.page-1, // react-admin is 1 based, spring is 0 based
            size: pagination.perPage,
            sort: sort.field,
            order: sort.order,
        }).toString();
        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resourceMap[resource];
        const url = `${apiUrl}${apiResource}/search?${query}`;
        return httpClient(url).then(({ json }) => {
            // Extract the embedded resources
            let data = json._embedded?.[apiResource] || [];
            return {
                data,
                total: json.page?.totalElements || data.length,
                pageInfo: {
                    hasNextPage: json?._links?.next || false,
                    hasPreviousPage: json?._links?.prev || false
                }
            } ;
        });
    },
    getOne: (resource, params) => {
        const apiResource = resourceMap[resource];
        return httpClient(`${apiUrl}${apiResource}?id=${params.id}`).then(({ json }) => {
            const data = json; // Assuming json is the schema object itself
            return { data };
        });
    },
    getMany: (resource, params) => {
        throwNotImplmentedError(resource, 'getMany');
    },
    getManyReference: (resource, params) => {
        throwNotImplmentedError(resource, 'getManyReference');
    },
    create: (resource, params) => {
        throwNotImplmentedError(resource, 'create');
    },
    update: (resource, params) => {
        throwNotImplmentedError(resource, 'update');
    },
    updateMany: (resource, params) => {
    },
    deleteMany: (resource, params) => {
        throwNotImplmentedError(resource, 'deleteMany');
    },
};
export default schemaStoreDataProvider;
