import {DataProvider, fetchUtils} from 'react-admin';
import config from './config'
import {ChecklistProps} from "./model/Checklist.tsx";
import {FieldProps} from "./model/Field.tsx";

const apiUrl = config.SCHEMA_STORE_URL + '/api/v2/';
const httpClient = fetchUtils.fetchJson;

const resourceMap = {
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

const checklistDataProvider: DataProvider = {
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
        const apiResource = resourceMap[resource];
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
        const apiResource = resourceMap[resource];
        return httpClient(`${apiUrl}${apiResource}?id=${params.id}`).then(({json}) => {
            const data = json; // Assuming json is the schema object itself
            return {data};
        });
    },
    getMany: (resource, params) => {
        throwNotImplementedError(resource, 'getMany');
    },
    getManyReference: (resource, params) => {
        throwNotImplementedError(resource, 'getManyReference');
    },
    create: (resource, params) => {
        throwNotImplementedError(resource, 'create');
    },
    update: (resource, params) => {
        throwNotImplementedError(resource, 'update');
    },
    updateMany: (resource, params) => {
    },
    deleteMany: (resource, params) => {
        throwNotImplementedError(resource, 'deleteMany');
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

const fieldsDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort} = params;
        return checklistDataProvider.getList(resource, params)
            .then((response) => {
                // Extract fields from the schemas response
                const fields = response.data
                    .map(schema => {
                        const characteristics = schema?.schema?.properties?.characteristics;
                        const properties = characteristics?.properties;

                        return Object.keys(characteristics).map(key => ({
                            id: key,
                            label: key,
                            ...characteristics[key],
                        }));
                    })
                    .flat();

                return {
                    data: fields,
                    total: fields.length,
                };
            });
    },
}

const schemaStoreDataProvider: DataProvider = {
    getList: (resource, params) => {
        if (resource == 'schemas') {
            return checklistDataProvider.getList(resource, params);
        }
        if (resource == 'schemas') {
            return fieldsDataProvider.getList(resource, params);
        }
        throw new Error(`invalid resource: ${resource}`);
    }
}
export default schemaStoreDataProvider;
