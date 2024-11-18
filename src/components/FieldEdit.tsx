import React from "react";
import {
    ArrayInput,
    Edit,
    FormDataConsumer,
    RadioButtonGroupInput, ReferenceInput,
    required,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    Validator
} from "react-admin";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";

// registry of field types and their specific controls
const inputMap = {
    'text': () => null,
    'choice': () => <ChoiceField/>,
    'pattern': () => <TextInput source="pattern"
                                validate={validateRegex}/>,
    'ontology': () => <ReferenceInput source="ontology" reference="ontologies" />,
    'taxon': () => null,
}

const validateRegex:Validator = (value: string) => {
    try {
        new RegExp(value);  // Try to create a RegExp
        return undefined;      // No error: it's a valid regex
    } catch (e) {
        return "Value should be a valid regular expression.";     // Error: it's not a valid regex
    }
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
    <SimpleForm mode="onChange" reValidateMode="onChange">
        <TextInput source="label" validate={required()}/>
        <TextInput source="description" multiline={true} validate={required()}/>
        <SelectAttrbiuteInput source="group"/>
        <RadioButtonGroupInput source="type"
                               validate={required()}
                               choices={
                                   Object.keys(inputMap)
                                       .map(id => ({id, name: toTitleCase(id)}))
                               }
        />
        <ConditionalInput/>
        <ArrayInput source="units" label="Units">
            <SimpleFormIterator fullWidth={false} inline>
                <TextInput fullWidth={false}/>
            </ SimpleFormIterator>
        </ArrayInput>
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
