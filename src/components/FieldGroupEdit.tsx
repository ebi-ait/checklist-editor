import React, {useState} from "react";
import {
    ArrayInput, AutocompleteArrayInput,
    AutocompleteInput,
    Edit,
    ReferenceInput,
    required,
    SimpleForm,
    SimpleFormIterator,
    TextInput, useDataProvider,
    useRecordContext
} from "react-admin";
import {FieldProps} from "../model/Field.tsx";
import {Stack, Typography} from "@mui/material";

// registry of field types and their specific controls
const inputMap = {
    'text': () => null,
    'choice': () => <ChoiceField/>
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

const FieldRender = () => {
    const record: FieldProps | undefined = useRecordContext();
    if (!record) return null;
    return (
        <Stack direction="row" gap={1} alignItems="left">
            <Stack>
                {record.label}
                <Typography variant="caption" color="text.secondary">
                    {record.type}, {record.group}
                </Typography>
            </Stack>
        </Stack>
    );
}


export const FieldGroupForm = () => {

    const options = ['host disease stage', 'health'];

    const dataProvider = useDataProvider();
    const [fieldOptions, setFieldOptions] = useState([]);


    return <SimpleForm mode="onChange" reValidateMode="onChange">
        <TextInput source="name" validate={required()}/>
        <TextInput source="description" multiline={true} validate={required()}/>

        <ArrayInput source="fields" label="Fields">
            <SimpleFormIterator inline>
                <TextInput name={""} source={""}/>
                {/*<AutocompleteInput choices={options} />*/}
            </SimpleFormIterator>
        </ArrayInput>

        {/*<ArrayInput source="fields" label="Fields">*/}
        {/*    <SimpleFormIterator inline>*/}
        {/*        <ReferenceInput source="fields"*/}
        {/*                        reference="fields"*/}
        {/*                        queryOptions={{meta: {size: 300}}}>*/}
        {/*            <AutocompleteInput*/}
        {/*                optionText={<FieldRender/>}*/}
        {/*                inputText={(record) => `${record.label} (${record.type})`}/>*/}
        {/*        </ReferenceInput>*/}
        {/*    </SimpleFormIterator>*/}
        {/*</ArrayInput>*/}
    </SimpleForm>;
}

export const FieldGroupEdit = () =>
    <Edit>
        <FieldGroupForm/>
    </Edit>;
