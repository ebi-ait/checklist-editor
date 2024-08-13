import React from "react";
import {
    Datagrid,
    DatagridConfigurable, EditButton,
    FilterButton,
    List, ReferenceArrayInput, ReferenceInput,
    RichTextField,
    SearchInput,
    SelectColumnsButton,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    UrlField,
} from "react-admin";


const SchemaPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <TextField source="name"/>
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
export const ChecklistList = () => (
    <List
          actions={<SchemaListActions/>}
          filters={schemaFilters}
    >
        <Datagrid expand={SchemaPreviewPanel}>
            <TextField source="title"/>
            <TextField source="accession"/>
            <TextField source="version"/>
            <EditButton />
        </Datagrid>
    </List>
);


