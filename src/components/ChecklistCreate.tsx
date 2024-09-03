import {ArrayInput, Create, ReferenceInput, SelectInput, SimpleForm, SimpleFormIterator, TextInput} from "react-admin";

export const ChecklistCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title"/>
            <TextInput source="description" multiline={true}/>
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
    </Create>
);
