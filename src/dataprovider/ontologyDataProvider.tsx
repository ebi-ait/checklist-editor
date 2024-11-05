// This data provider handles fields
import {DataProvider, fetchUtils, SortPayload} from "react-admin";
import config from "../config.tsx";
import {FieldProps} from "../model/Field.tsx";
import {fixTrailingSlash, resolveApiResource} from "./schemaStoreDataProvider.tsx";

const apiUrl = fixTrailingSlash(config.OLS_URL);
const httpClient = fetchUtils.fetchJson;

const recordToId = (record) => ({
    id: record.ontology_name,
    ...record
});

const getElements = (json) => json.response.docs;

export const ontologyDataProvider: DataProvider = {

    getList: (resource, params) => {
        const {filter = {}, pagination, sort, meta} = params;

        // Adjust the URL to point to the right endpoint for lists
        const apiResource = resolveApiResource(resource);
        const query = {
            type:'ontology',
            q:'*',
            // TODO: how to pass page info to ols api?
        };

        const queryString = new URLSearchParams(query).toString();
        if (Object.keys(filter).length > 0) {
            if (filter.q) { // it's a text search
                searchResource = '/search/findAllByTextPartial'
            } else { // it's a regular attribute search
                searchResource = '/search/findByExample'
            }
        }
        const url = `${apiUrl}search?${queryString}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = getElements(json) || [];
                data = data.map(recordToId);
                return {
                    data,
                    total: json?.numFound || data.length,
                    pageInfo: {
                        // TODO: how to get page info from ols response?
                        hasNextPage:  false,
                        hasPreviousPage:  false
                    }
                };
            });
    },
    getOne: (resource) => Promise.reject(`${resource} getOne not implemented`),
    getMany: (resource, params) => {
        const {ids, meta = {}} = params;
        const apiResource = resolveApiResource(resource);
        // see https://www.ebi.ac.uk/ols4/v3/api-docs
        const searchParams = new URLSearchParams({
            type:'ontology',
            queryFields:'ontology_name'
        });
        // target is the name of the query string parameter
        // id is the value
        // TODO: resolve search resource from target name
        searchParams.append('q', ids);
        if (meta.hasOwnProperty('size')) {
            searchParams.append('size', meta.size)
        }
        const query = searchParams.toString();
        const url = `${apiUrl}search?${query}`;
        return httpClient(url)
            .then(({json}) => {
                // Extract the embedded resources
                let data = getElements(json) || [];
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
    getManyReference: (resource) => Promise.reject(`${resource} getManyReference not implemented`),
    create: async (resource) => Promise.reject(`${resource} create not implemented`),

    update: async (resource) => Promise.reject(`${resource} update not implemented`),
    updateMany: (resource) => Promise.reject(`${resource} updateMany not implemented`),
    deleteMany: (resource) => Promise.reject(`${resource} delete not implemented`),
    // getAttributeValues: (resource: string, attributeName: string) => {
    //     debugger;
    //     return Promise.reject(`${resource} getAttributeValues not implemented`);
    // }

};
