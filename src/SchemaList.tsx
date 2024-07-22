import React from "react";
import {
    DatagridConfigurable,
    FilterButton,
    Labeled,
    List,
    RichTextField,
    SearchInput,
    SelectColumnsButton,
    Show,
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
            </SimpleShowLayout>
        </Show>
    );
};
