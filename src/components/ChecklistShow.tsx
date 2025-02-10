import {EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext} from 'react-admin';
import {PaginatedListField} from "./PaginatedListField.tsx";

export const ChecklistShow = () => (
    <Show emptyWhileLoading
          actions={<ChecklistShowActions/>}>
        <ChecklistShowContent/>
    </Show>
);

const ChecklistShowActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
            {record && record.editable && <EditButton/>}
        </TopToolbar>
    );
}

const ChecklistShowContent = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <SimpleShowLayout>
            <TextField source="title"/>
            <SimpleShowLayout direction={"row"}>
                <TextField source="accession"/>
                <TextField source="version"/>
                <TextField source="group"/>
                <TextField source="authority"/>
            </SimpleShowLayout>
            <TextField source="description"/>
            <PaginatedListField source="schemaFieldAssociations" label="Fields"/>

        </SimpleShowLayout>
    );
};
