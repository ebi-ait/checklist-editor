import {
    ArrayInput,
    Edit,
    ReferenceArrayInput,
    ReferenceInput,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from "react-admin";

export const ChecklistEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput source="description" multiline={true} rows={3}/>
            <ArrayInput source="schemaFieldAssociations" label="Fields">
                <SimpleFormIterator inline>
                    <SelectInput source="cardinality" choices={[
                        { id: 'OPTIONAL', name: 'Optional' },
                        { id: 'MANDATORY', name: 'Mandatory' },
                        { id: 'RECOMMENDED', name: 'Recommended' },
                    ]} />
                    <SelectInput source="multiplicity" choices={[
                        { id: 'Single', name: 'Single' },
                        { id: 'List', name: 'List' },
                    ]} />
                    <ReferenceInput source="fieldId" reference="fields" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);
