import React from "react";
import {
    ArrayInput,
    AutocompleteInput,
    Edit,
    FormDataConsumer,
    ReferenceInput,
    required,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    useRecordContext,
    Validator
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

export const FieldGroupForm = () =>
    <SimpleForm mode="onChange" reValidateMode="onChange">
        <TextInput source="name" validate={required()}/>
        <TextInput source="description" multiline={true} validate={required()}/>
        <ArrayInput source="schemaFieldAssociations" label="Fields">
            <SimpleFormIterator inline>
                <ReferenceInput source="fieldId"
                                reference="fields"
                                queryOptions={{meta: {size: 300}}}>
                    <AutocompleteInput
                        optionText={<FieldRender/>}
                        inputText={(record) => `${record.label} (${record.type})`}/>
                </ReferenceInput>
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>;

export const FieldGroupEdit = () =>
    <Edit>
        <FieldGroupForm/>
    </Edit>;
