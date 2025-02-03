import {
    DateField,
    EditButton,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext
} from "react-admin";
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
export const FieldShow = () =>
    <Show emptyWhileLoading
          actions={<FieldShowActions />}>
        <SimpleShowLayout>
            <FieldTypeIcon/>
            <TextField source="label"/>
            <ReferenceField source="group"
                            reference="fieldGroups"
                            label="Group">
                <TextField source="name"/>
            </ReferenceField>
            <TextField source="version"/>
            <DateField source="lastModifiedDate" showTime/>
            <ConditionalEditButton/>
        </SimpleShowLayout>
    </Show>
