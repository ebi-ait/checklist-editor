import {Stack, Typography} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {
    ArrayInput,
    AutocompleteInput,
    Edit,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
    useNotify,
    useRecordContext,
    useRedirect,
    Validator
} from "react-admin";
import {TrackResourcePage} from "../analytics.tsx";

import {FieldProps} from "../model/Field.tsx";
import {SelectAttributeInput} from "./SelectAttributeInput.tsx";

const FieldRender = () => {
    const record: FieldProps | undefined = useRecordContext();
    if (!record) return null;
    return (
        <Stack direction="row" gap={1} alignItems="left">
            <Stack>
                {record.label}
                <Typography variant="caption" color="text.secondary">
                    {record.type}, {record.version} ({record.latest ? 'latest' : 'not latest'}), {record.group}
                </Typography>
            </Stack>
        </Stack>
    );
}

const validateUnique: Validator = (value: string, values) => {
    if (values.schemaFieldAssociations.filter(assoc => assoc.fieldId == value).length == 1) {
        return undefined; // means valid
    } else {
        return `duplicate field are not allowed. Please check field ${value}`;
    }
};

export const ChecklistForm = ({mandatoryFields}) => {
    const record = useRecordContext();
    if (record && !record.id) { // have the record and 'record.id' is not present => we are cloning a record
        // todo discuss
        // 1. Why this method is executing twice
        // 2. Why backend is throwing id not present exception if id == null. This is also happening in create checklist
        if (record.accession) {
            record.title = `${record.title} DUPLICATE`;
        }
        record.accession = null;
        record.version = null;
        record.id = "";
    }


    return <SimpleForm
        defaultValues={mandatoryFields}
        mode="onChange"
        reValidateMode="onChange"
        warnWhenUnsavedChanges >
        <TextInput source="title" validate={required()}/>
        <TextField source="accession" label="Accession"/>
        <TextField source="version" label="Version"/>
        <TextField source="authority" label={"Authority"}/>
        <SelectAttributeInput source="group" validate={required()}/>
        <TextInput source="description" multiline={true} rows={2}/>
        <ArrayInput source="schemaFieldAssociations" label="Fields">
            <SimpleFormIterator inline>
                <ReferenceInput source="fieldId"
                                reference="fields"
                                queryOptions={{meta: {size: 300}}}
                                sort={{field: 'name', order: 'ASC'}}
                                filter={{latest: true}}>
                    <AutocompleteInput
                        filterToQuery={q => ({q, searchIndex: q, latest: true})}
                        optionText={<FieldRender/>}
                        inputText={(record) => `${record.label} (${record.type})`}
                        validate={validateUnique}/>
                </ReferenceInput>
                <SelectInput source="requirementType"
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
            <TrackResourcePage action={"edit"}/>
            <ChecklistForm/>
        </Edit>
    );
};
