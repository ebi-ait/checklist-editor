import React, {useEffect, useState} from "react";
import {
    ArrayInput, AutocompleteInput,
    Edit,
    FormDataConsumer,
    RadioButtonGroupInput, ReferenceInput,
    required, SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput, useDataProvider, useRecordContext,
    Validator
} from "react-admin";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";
import {FieldProps} from "../model/Field.tsx";
import {Stack, Typography} from "@mui/material";
import {FieldGroupProps} from "../model/FieldGroup.tsx";

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


const FieldGroupRender = () => {
    const record: FieldGroupProps | undefined = useRecordContext();
    if (!record) return null;
    return (
        <Stack direction="row" gap={1} alignItems="left">
            <Stack>
                {record.name}
                <Typography variant="caption" color="text.secondary">
                    {record.description}
                </Typography>
            </Stack>
        </Stack>
    );
}

export const FieldForm = () => {
    // const dataProvider = useDataProvider();
    // const [fieldGroupOptions, setFieldGroupOptions] = useState(true);
    //
    // useEffect(() => {
    //     // Fetch attributes from the "Attributes" resource
    //     dataProvider
    //         .getList('fieldGroups', {
    //             pagination: { page: 1, perPage: 100 },
    //             sort: { field: 'name', order: 'ASC' },
    //             filter: {},
    //         })
    //         .then(({ data }) => {
    //             setFieldGroupOptions(
    //                 data.map((attribute) => ({
    //                     id: attribute.id,
    //                     name: attribute.name,
    //                 }))
    //             );
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching attributes:', error);
    //         });
    // }, [dataProvider]);

    return (
    <SimpleForm mode="onChange" reValidateMode="onChange">
        <TextInput source="label" validate={required()}/>
        <TextInput source="description" multiline={true} validate={required()}/>
        <SelectAttrbiuteInput source="group"/>

        <SelectInput
            source="group"
            label="Field Group"
            // choices={fieldGroupOptions}
            optionText="name"
            optionValue="id"
        />

        <ArrayInput source="group" label="Field Group">
            <SimpleFormIterator inline>
                <ReferenceInput source="fieldGroupId"
                                reference="fieldGroups"
                                queryOptions={{meta: {size: 300}}}>
                    <AutocompleteInput
                        optionText={<FieldGroupRender/>}
                        inputText={(record) => `${record.name}`}/>
                </ReferenceInput>
            </SimpleFormIterator>
        </ArrayInput>


        <RadioButtonGroupInput source="type"
                               validate={required()}
                               choices={
                                   Object.keys(inputMap)
                                       .map(id => ({id, name: toTitleCase(id)}))
                               }
        />
        <ConditionalInput/>
        <ArrayInput source="units" label="Units">
            <SimpleFormIterator>
                <TextInput/>
            </ SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>);
}
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
