import React, {useMemo} from "react";
import {
    Datagrid,
    DatagridConfigurable,
    FilterButton,
    Labeled,
    List,
    ListContextProvider,
    RichTextField,
    SearchInput,
    SelectColumnsButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    UrlField,
    useRecordContext,
} from "react-admin";


const SchemaPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <RichTextField source="description"/>
            <UrlField source="_links.self.href"/>
        </SimpleShowLayout>
    );
};

const SchemaListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <SelectColumnsButton/>
    </TopToolbar>
);

const schemaFilters = [
    <SearchInput source="q" alwaysOn/>,

];
export const SchemaList = () => (
    <List actions={<SchemaListActions/>}
          filters={schemaFilters}>
        <DatagridConfigurable expand={SchemaPreviewPanel}>
            {/*<TextField source="id" />*/}
            <TextField source="accession"/>
            <TextField source="name"/>
            <TextField source="version"/>
            <TextField source="title"/>
            {/*<TextField source="schema.$schema" />*/}
            {/*<TextField source="_links.self.href" />*/}
        </DatagridConfigurable>
    </List>
);


const FieldList = () => {
    const record = useRecordContext();

    const properties = record?.schema?.properties?.characteristics?.properties;
    if (!properties) return null;
    const fieldArray = useMemo(() =>
        Object.entries(properties).map(([label, field]) => ({
            id: label,
            label,
        })), [properties]);

    const listContext = useMemo(() => ({
        data: fieldArray,
        ids: fieldArray.map(field => field.id),
    }), [fieldArray]);
    return (
        <ListContextProvider value={listContext}>
            <Datagrid>
                <TextField source="label" label="Label"/>
                {/*<TextField source="name" label="Name" />*/}
                {/*<TextField source="description" label="Description" />*/}
                {/*<TextField source="mandatory" label="Mandatory" />*/}
                {/*<TextField source="cardinality" label="Cardinality" />*/}
            </Datagrid>
        </ListContextProvider>
    );
};

/**
 * Fetch a book from the API and display it
 */
export const SchemaShow = () => {
    return (
        <Show emptyWhileLoading>
            <SimpleShowLayout>
                <Labeled label="Title">
                    <TextField source="title"/>
                </Labeled>
                <FieldList/>
            </SimpleShowLayout>
        </Show>
    );
};
