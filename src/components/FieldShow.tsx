import {
    DateField,
    EditButton, Loading,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext
} from "react-admin";
import {TrackResourcePage} from "../analytics.tsx";
import {ConditionalEditButton} from "./FieldList.tsx";
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";

const FieldShowActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
            { record && record.editable &&  <EditButton /> }
        </TopToolbar>
    );
}
export const FieldShow = () => {
    return <Show emptyWhileLoading
                 actions={<FieldShowActions/>}>
        <TrackResourcePage action={"show"}/>
        <SimpleShowLayout>
            <FieldTypeIcon/>
            <TextField source="label"/>
            <ReferenceField source="group"
                            reference="fieldGroups"
                            label="Group">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="version"/>
            <TextField source="description"/>
            <TextField source="lastModifiedBy"/>
            <DateField source="lastModifiedDate" showTime/>
            <ConditionalEditButton/>
        </SimpleShowLayout>
    </Show>;
}
