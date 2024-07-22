import React from "react";
import {Datagrid, List, RichTextField, SimpleShowLayout, TextField, useRecordContext} from "react-admin";

const SchemaPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <RichTextField source="description" />
        </SimpleShowLayout>
    );
};
export const SchemaList = () => (
    <List>
        <Datagrid expand={SchemaPreviewPanel}>
            {/*<TextField source="id" />*/}
            <TextField source="accession" />
            <TextField source="name" />
            <TextField source="version" />
            <TextField source="title" />
            {/*<TextField source="schema.$schema" />*/}
            {/*<TextField source="_links.self.href" />*/}
        </Datagrid>
    </List>
);
