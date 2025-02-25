import {DataProvider} from 'react-admin';
import {ChecklistProps} from "../model/Checklist.tsx";

import {fieldsDataProvider} from "./fieldsDataProvider.tsx";
import {ontologyDataProvider} from "./ontologyDataProvider.tsx";
import {schemasDataProvider} from "./schemasDataProvider.tsx";
import {fieldGroupsDataProvider} from "./fieldGroupsDataProvider.tsx";

export function fixTrailingSlash(url: string) {
    return url + (url.at(-1) != '/' ? '/' : '');
}

const resourceMap: { [k: string]: string } = {
    checklists: 'mongoJsonSchemas',
    users: 'users',
};

export function resolveApiResource(resource: string) {
    return resourceMap?.[resource] || resource;
}

const checklistRecordToId = (record: ChecklistProps) => ({
    ...record,
    id: `${record.accession}:${record.version}`,
});

const userRecordToId = (record) => ({
    ...record,
    id: record.username,
});

const dataProviderRegistry: { [k: string]: DataProvider } = {
    'checklists': schemasDataProvider(checklistRecordToId),
    'users': schemasDataProvider(userRecordToId),
    'fields': fieldsDataProvider,
    'fieldGroups': fieldGroupsDataProvider,
    'ontologies': ontologyDataProvider,
};

const callDataProviderFunction = function (resource: string, op: string, params: any) {
    if (Object.prototype.hasOwnProperty.call(dataProviderRegistry, resource)) {
        return dataProviderRegistry[resource]?.[op](resource, params);
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
    delete: (resource, params) => callDataProviderFunction(resource, 'delete', params),
    getAttributeValues: (resource, params) => callDataProviderFunction(resource, 'getAttributeValues', params),
}
export default schemaStoreDataProvider;
