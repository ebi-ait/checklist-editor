import {PriorityHigh, Recommend,} from '@mui/icons-material';
import {
    ArrayField,
    ChipField,
    Datagrid,
    ReferenceField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    useRecordContext
} from 'react-admin';
import {GrMultiple} from "react-icons/gr";
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {IconField} from "./IconField.tsx";

const FieldPanel = () => {
    const record = useRecordContext();
    return (
        <SimpleShowLayout>
            {record.type === 'choice' && (
                <ArrayField source="choices">
                    <SingleFieldList linkType={false}>
                        <ChipField source="choice"/>
                    </SingleFieldList>
                </ArrayField>
            )}
            {record.type === 'pattern' && (
                <TextField source="pattern"/>
            )}
            {record.type === 'ontology' && (
                <TextField source="ontology"/>
            )}
        </SimpleShowLayout>
    );
}

export const ChecklistShow = () => (
    <Show emptyWhileLoading>
        <ChecklistShowContent />
    </Show>
);

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
                            <ReferenceField source="fieldId" reference="fields" link={false}
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <TextField source="label"/>
                            </ReferenceField>
                            <ReferenceField label="Type" source="fieldId" reference="fields" link={false}
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <FieldTypeIcon/>
                            </ReferenceField>
                            <ReferenceField label="Group" source="fieldId" reference="fields" link={false}
                                            queryOptions={{ meta: { size: 300, parentId: record.id } }}>
                                <TextField source="group"/>
                            </ReferenceField>
                            <IconField source="requirementType" label="Required" iconMapping={{
                                MANDATORY: PriorityHigh,
                                OPTIONAL: null,
                                RECOMMENDED: Recommend,
                            }}/>
                            <IconField source="multiplicity" iconMapping={{
                                Single: null,
                                List: GrMultiple,
                            }}/>
                        </Datagrid>
                    </ArrayField>
            </SimpleShowLayout>
    );
};
