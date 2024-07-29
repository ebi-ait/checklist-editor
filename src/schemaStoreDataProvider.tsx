import {DataProvider, fetchUtils, GetListParams} from 'react-admin';
import config from './config'
import {ChecklistProps} from "./model/Checklist.tsx";
import {FieldProps} from "./model/Field.tsx";

const apiUrl = config.SCHEMA_STORE_URL + '/api/v2/';
const httpClient = fetchUtils.fetchJson;

const resourceMap:{[k:string]:string} = {
    checklists: 'schemas',
};

function throwNotImplementedError(resource: string, functionName: string) {
    const errMsg = `${functionName}(${resource}) not implemented`;
    console.error(errMsg);
    throw new Error(errMsg)
}

function filterBSDChecklists(data) {
    return data.filter(checklist => !checklist.accession.startsWith('BSD'))
}

function getApiResource(resource: string) {
    return resourceMap?.[resource] || resource;
}

const schemasDataProvider: DataProvider = {
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
        const apiResource = getApiResource(resource);
        const url = `${apiUrl}${apiResource}/search?${query}`;
        return httpClient(url).then(({json}) => {
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
    getOne: (resource, params) => {
        return httpClient(`${apiUrl}${getApiResource(resource)}?id=${params.id}`).then(({json}) => {
            const data = json; // Assuming json is the schema object itself
            return {data};
        });
    },
    getMany: (resource, params) => {
        return Promise.reject('not implemented')
    },
    getManyReference: (resource, params) => {
        return Promise.reject('not implemented')
    },
    create: (resource, params) => {
         return Promise.reject('not implemented')
    },
    update: (resource, params) => {
        return Promise.reject('not implemented')
    },
    updateMany: (resource, params) => {
        return Promise.reject('not implemented')
    },
    deleteMany: (resource, params) => {
        return Promise.reject('not implemented')
    },
};

const isMandatoryField = (checklist: ChecklistProps, label: string) => {
    const characteristics = checklist?.schema?.properties?.characteristics;
    if (characteristics.allOf.flatMap(x => x.oneOf).map(x => x.required).flatMap(x => x).includes(label)) {
        return "mandatory";
    } else {
        return "optional";
    }
};

const fieldType = (checklist: ChecklistProps, label: string) => {
    const characteristics = checklist?.schema?.properties?.characteristics;
    const properties = characteristics?.properties;
    const textAttribute = properties[label].items.properties.text;
    if (Object.prototype.hasOwnProperty.call(textAttribute, 'enum')) {
        return 'choice';
    } else if (Object.prototype.hasOwnProperty.call(textAttribute, 'pattern')) {
        return 'pattern';
    } else {
        return "text";
    }
};
const schemaToFieldList = (checklist: ChecklistProps) => {
    const characteristics = checklist?.schema?.properties?.characteristics;
    const properties = characteristics?.properties;
    return Object.entries(properties)
        .map(([label, field]) => ({
            id: label,
            label,
            mandatory: isMandatoryField(checklist, label),
            type: fieldType(checklist, label)
        } as FieldProps));
};


// This data provider handles fields
const fieldsDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort} = params;
        debugger;
        return schemaStoreDataProvider.getList('checklists', params)
            .then((response) => {
                const fields = response.data
                    .map(schema=> schemaToFieldList(schema))
                    .flat();
                return {
                    data: fields,
                    total: fields.length,
                };
            });
    },
    getManyReference: (resource, params) => {
        const {id} = params;
        return schemaStoreDataProvider.getOne('checklists', {id})
            .then((response) => {
                const fields = schemaToFieldList( response.data)
                return {
                    data: fields,
                    total: fields.length,
                };
            });
    },
}

const dataProviderRegistry:{[k:string]:DataProvider} = {
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
