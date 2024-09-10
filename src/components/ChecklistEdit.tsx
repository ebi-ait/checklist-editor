import {
    ArrayInput,
    AutocompleteInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput, useRecordContext
} from "react-admin";
import {FieldProps} from "../model/Field.tsx";
import {Stack, Typography} from "@mui/material";

const FieldRender = () => {
    const record: FieldProps | undefined = useRecordContext();
    if (!record) return null;
    return (
        <Stack direction="row" gap={1} alignItems="left">
            <Stack>
                    {record.label}
                <Typography variant="caption" color="text.secondary">
                {record.type}
                </Typography>
            </Stack>
        </Stack>
    );
}

export const ChecklistEdit = () => (
    <Edit >
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
                    <ReferenceInput source="fieldId" reference="fields" >
                        <AutocompleteInput
                            optionText={<FieldRender/>}
                            inputText={(record)=> `${record.label} (${record.type})`}
                        />
                    </ReferenceInput>
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit >
);
