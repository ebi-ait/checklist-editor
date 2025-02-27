import {
    ArrayField,
    DateField,
    EditButton,
    ReferenceField,
    Show,
    SimpleList,
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
            {record && record.editable && <EditButton/>}
        </TopToolbar>
    );
}


export const FieldShow = () => {
    const record = useRecordContext();
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
            <ArrayField source="units">
                <SimpleList
                    primaryText={record => record}
                >
                </SimpleList>
            </ArrayField>
            <ConditionalEditButton/>
        </SimpleShowLayout>
    </Show>;
}
