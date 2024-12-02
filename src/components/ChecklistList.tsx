import React from "react";
import {
    CanAccess,
    CloneButton,
    CreateButton,
    Datagrid,
    DateField,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    SearchInput,
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
    </TopToolbar>
);


const filters = [
    <SearchInput source="searchable" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id:true,name:'True'}, {id:false,name:'False'}]}/>,
    <SelectInput source="authority"
                 choices={[{id:"ENA", name:"ENA"}, {id:"BIOSAMPLES",name:'BioSamples'}]}/>,
    <SelectAttrbiuteInput source="group"/>
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
            filterDefaultValues={{latest:true}}
        >
            <Datagrid expand={ChecklistPreviewPanel}>
                <TextField source="title"/>
                <TextField source="accession"/>
                <TextField source="version"/>
                <TextField source="authority"/>
                <TextField source="group"/>
                <DateField source="lastModifiedDate" showTime/>
                <FunctionField
                    label="Field Count"
                    render={record => record.schemaFieldAssociations?.length ?? 0}
                />
                <ConditionalEditButton/>
                <CanAccess action="create">
                    <CloneButton/>
                </CanAccess>
            </Datagrid>
        </List>
    );
};
