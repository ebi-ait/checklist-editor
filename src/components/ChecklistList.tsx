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
import {ChecklistPreviewPanel} from "./ChecklistPreviewPanel.tsx";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";


const SchemaListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <SelectColumnsButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="searchable" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectInput source="authority"
                 choices={[{id: 'ENA', name: 'ENA'}, {id: 'BIOSAMPLES', name: 'BioSamples'}]}/>,
    <SelectAttrbiuteInput source="group"/>,
    <SelectAttrbiuteInput source="lastModifiedBy"/>,
];

const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.editable ? <EditButton/> : null;
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
                    <CloneButton/>
                </CanAccess>
            </DatagridConfigurable>
        </List>
    );
};
