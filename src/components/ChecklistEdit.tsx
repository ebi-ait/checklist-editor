import {Stack, Typography} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {
    ArrayInput,
    AutocompleteInput,
    Edit,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator, TextField,
    TextInput,
    useNotify,
    useRecordContext,
    useRedirect
} from "react-admin";
import {FieldProps} from "../model/Field.tsx";

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

export const ChecklistForm = () => {
    return <SimpleForm>
        <TextInput source="title"/>
        <TextField source="accession" label="Accession"/>
        <TextField source="version" />
        <TextField source="authority" />
        <TextInput source="group" />
        <TextInput source="description" multiline={true} rows={2}/>
        <ArrayInput source="schemaFieldAssociations" label="Fields">
            <SimpleFormIterator inline>
                <ReferenceInput source="fieldId"
                                reference="fields"
                                queryOptions={{ meta: { size: 300 } }}>
                    <AutocompleteInput
                        optionText={<FieldRender/>}
                        inputText={(record) => `${record.label} (${record.type})`}/>
                </ReferenceInput>
                <SelectInput source="cardinality"
                             choices={[
                                 {id: "OPTIONAL", name: "Optional"},
                                 {id: "MANDATORY", name: "Mandatory"},
                                 {id: "RECOMMENDED", name: "Recommended"},
                             ]}
                             defaultValue={"MANDATORY"}/>
                <SelectInput source="multiplicity"
                             choices={[
                                 {id: "Single", name: "Single"},
                                 {id: "List", name: "List"},
                             ]}
                             defaultValue={"Single"}/>
            </SimpleFormIterator>
        </ArrayInput>
    </SimpleForm>;
};

export const ChecklistEdit = () => {
    const queryClient = useQueryClient(); // Access the QueryClient instance
    const redirect = useRedirect();
    const notify = useNotify();
    const handleSuccess = (data) => {
        queryClient.invalidateQueries(['checklists']);
        notify('Checklist updated successfully', {type: 'success'});
        redirect('list', 'checklists');
    };
    return (
        <Edit
            mutationMode={"pessimistic"}
            mutationOptions={{onSuccess: handleSuccess}}
        >
            <ChecklistForm/>
        </Edit>
    );
};
