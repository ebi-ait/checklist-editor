import {
    CanAccess,
    CloneButton,
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    SearchInput,
    SelectColumnsButton,
    SelectInput,
    TextField,
    TopToolbar,
    useRecordContext,
} from "react-admin";
import {recordClickEvent} from "../analytics.tsx";
import {ChecklistPreviewPanel} from "./ChecklistPreviewPanel.tsx";
import {SelectAttributeInput} from "./SelectAttributeInput.tsx";


const SchemaListActions = () => (
    <TopToolbar>
        <FilterButton onClick={recordClickEvent}/>
        <CreateButton onClick={recordClickEvent}/>
        <SelectColumnsButton onClick={recordClickEvent}/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="searchable" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectInput source="authority"
                 choices={[{id: 'ENA', name: 'ENA'}, {id: 'BIOSAMPLES', name: 'BioSamples'}]}/>,
    <SelectAttributeInput source="group"/>,
    <SelectAttributeInput source="lastModifiedBy"/>,
];

const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.editable ? <EditButton onClick={recordClickEvent}/> : null;
};

export const ChecklistList = () => {
    return (
        <List
            actions={<SchemaListActions/>}
            filters={filters}
            filterDefaultValues={{latest: true, authority: 'ENA'}}
            sort={{field: 'lastModifiedDate', order: 'DESC'}}
        >
            <DatagridConfigurable expand={ChecklistPreviewPanel}>
                <TextField source="title"/>
                <TextField source="accession"/>
                <TextField source="version"/>
                <TextField source="group"/>
                <TextField source="lastModifiedBy"/>
                <DateField source="lastModifiedDate" showTime/>
                <FunctionField
                    label="Field Count"
                    render={record => record.schemaFieldAssociations?.length ?? 0}
                />
                <ConditionalEditButton/>
                <CanAccess action="create">
                    <CloneButton onClick={recordClickEvent}/>
                </CanAccess>
            </DatagridConfigurable>
        </List>
    );
};
