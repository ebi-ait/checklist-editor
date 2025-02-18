import React from "react";
import {ArrayInput, Edit, required, SimpleForm, SimpleFormIterator, TextInput} from "react-admin";

export const ChoiceField = () =>
    <ArrayInput source="choices">
        <SimpleFormIterator inline>
            <TextInput source="."/>
        </SimpleFormIterator>
    </ArrayInput>;

export const FieldGroupForm = () => {
    return <SimpleForm mode="onChange" reValidateMode="onChange">
        <TextInput source="name" validate={required()}/>
        <TextInput source="description" multiline={true} validate={required()}/>

        <ArrayInput source="fields" label="Fields">
            <SimpleFormIterator inline>
                <TextInput name={""} source={""} readOnly={true}/>
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>;
}

export const FieldGroupEdit = () =>
    <Edit>
        <FieldGroupForm/>
    </Edit>;
