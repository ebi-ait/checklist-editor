import React from "react";
import {
    DatagridConfigurable,
    FilterButton,
    List,
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


