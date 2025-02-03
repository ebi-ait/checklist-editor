import {PriorityHigh, Recommend, ViewHeadline,} from '@mui/icons-material';
import {
    ArrayField,
    Datagrid, EditButton,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField, TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {IconField} from "./IconField.tsx";

export const ChecklistShow = () => (
    <Show emptyWhileLoading
          actions={<ChecklistShowActions />} >
        <ChecklistShowContent />
    </Show>
);

const ChecklistShowActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
            { record && record.editable &&  <EditButton /> }
        </TopToolbar>
    );
}

const ChecklistShowContent = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
            <SimpleShowLayout>
                    <TextField source="title"/>
                    <TextField source="accession"/>
                    <TextField source="version"/>
                    <TextField source="description"/>
                    <TextField source="authority"/>
                    <TextField source="group"/>
                    <ArrayField source="schemaFieldAssociations" label="Fields">
                        <Datagrid rowClick={false}>
                            <ReferenceField source="fieldId" reference="fields"
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <TextField source="label"/>
                            </ReferenceField>
                            <ReferenceField label="Type" source="fieldId" reference="fields" link={false}
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <FieldTypeIcon/>
                            </ReferenceField>
                            <ReferenceField label="Group" source="fieldId" reference="fields" link={false}
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <ReferenceField source="group"
                                                reference="fieldGroups"
                                                label="Group">
                                    <TextField source="name" />
                                </ReferenceField>
                            </ReferenceField>
                            <IconField source="requirementType" label="Required" iconMapping={{
                                MANDATORY: PriorityHigh,
                                OPTIONAL: null,
                                RECOMMENDED: Recommend,
                            }}/>
                            <IconField source="multiplicity" iconMapping={{
                                Single: null,
                                List: ViewHeadline,
                            }}/>
                        </Datagrid>
                    </ArrayField>
            </SimpleShowLayout>
    );
};
