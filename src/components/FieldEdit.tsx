import React from "react";
import {
    ArrayInput,
    Edit,
    FormDataConsumer,
    RadioButtonGroupInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput
} from "react-admin";

// registry of field types and their specific controls
const inputMap = {
    'text': () => null,
    'choice': () => <ChoiceField/>,
    'pattern': () => <TextInput source="pattern"/>,
    'ontology': () => <TextInput source="ontology"/>,
    'taxon': () => null,
}

export const ChoiceField = () =>
    <ArrayInput source="choices">
        <SimpleFormIterator inline>
            <TextInput source="."/>
        </SimpleFormIterator>
    </ArrayInput>;

function toTitleCase(s: string) {
    return s[0]?.toUpperCase() + (s.length > 1 ? s.substring(1) : '');
}

export const FieldForm = () =>
    <SimpleForm>
        <TextInput source="label"/>
        <TextInput source="description"/>
        <TextInput source="group"/>
        <RadioButtonGroupInput source="type"
                               choices={
                                   Object.keys(inputMap)
                                       .map(id => ({id, name: toTitleCase(id)}))
                               }
        />
        <ConditionalInput/>
    </SimpleForm>;
// Custom input component based on an attribute
export const ConditionalInput = ({selectorAttrName = 'type'}) =>
    <FormDataConsumer>
        {({formData, ...rest}) => {
            // Get the value of the type field from formData
            const inputType = formData[selectorAttrName];

            // Retrieve the component from the map based on the type field
            const InputComponent = inputMap[inputType];
            return InputComponent ? InputComponent(rest) : null;
        }}
    </FormDataConsumer>;


export const FieldEdit = () =>
    <Edit>
        <FieldForm/>
    </Edit>;
