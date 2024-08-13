import {
    ArrayInput,
    CheckboxGroupInput,
    Edit,
    ReferenceArrayInput, ReferenceInput, SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from "react-admin";
import React from "react";

export const ChecklistEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name"/>
            <TextInput source="title"/>
            <TextInput source="accession"/>
            <TextInput source="version"/>
            <TextInput source="description" multiline={true}/>
            <ArrayInput source="schemaFieldAssociations">
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
