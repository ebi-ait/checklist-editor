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
import {IconField} from "./IconField.tsx";
import {LooksOne, RadioButtonChecked, RadioButtonUnchecked, ViewHeadline} from '@mui/icons-material';

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
        </SimpleShowLayout>
    );
}
/**
 * Fetch a book from the API and display it
 */
export const ChecklistShow = () => {
    return (
        <Show emptyWhileLoading >
            <SimpleShowLayout>
                    <TextField source="title"/>
                    <TextField source="description"/>
                    <ArrayField source="schemaFieldAssociations" label="Fields">
                        <Datagrid>
                            <ReferenceField source="fieldId" reference="fields" link={false}>
                                <TextField source="label"/>
                            </ReferenceField>
                            <ReferenceField label="Type" source="fieldId" reference="fields" link={false}>
                                <TextField source="type"/>
                            </ReferenceField>
                            <IconField source="requirementType" label="Required" iconMapping={{
                                MANDATORY: RadioButtonChecked,
                                OPTIONAL: RadioButtonUnchecked,
                            }}/>
                            <IconField source="multiplicity" iconMapping={{
                                Single: LooksOne,
                                List: ViewHeadline,
                            }}/>
                        </Datagrid>
                    </ArrayField>
            </SimpleShowLayout>
        </Show>
    );
};
