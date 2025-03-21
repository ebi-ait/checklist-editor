import {DateField, EditButton, Show, SimpleShowLayout, TextField, TopToolbar, useRecordContext} from 'react-admin';
import {recordClickEvent, TrackResourcePage} from "../analytics.tsx";
import {ExportTSVButton} from "./ExportTSVButton.tsx";
import {PaginatedListField} from "./PaginatedListField.tsx";

export const ChecklistShow = () => {
    return (
        <Show emptyWhileLoading
              actions={<ChecklistShowActions/>}>
            <ChecklistShowContent/>
        </Show>
    );
};

const ChecklistShowActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
            {record && record.editable && <EditButton onClick={recordClickEvent}/>}
            <ExportTSVButton/>
        </TopToolbar>
    );
}

const ChecklistShowContent = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <>
            <TrackResourcePage action={"show"}/>
            <SimpleShowLayout>
                <TextField source="title"/>
                <SimpleShowLayout direction={"row"}>
                    <TextField source="accession"/>
                    <TextField source="version"/>
                    <TextField source="group"/>
                    <TextField source="authority"/>
                    <DateField source="lastModifiedDate"/>
                    <TextField source="lastModifiedBy"/>
                </SimpleShowLayout>
                <TextField source="description"/>
                <PaginatedListField source="schemaFieldAssociations" label="Fields"/>

            </SimpleShowLayout>
        </>
    );
};
