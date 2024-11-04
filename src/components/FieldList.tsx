import {Abc, EmergencyRecording, ListAlt, PestControlRodent, Share} from "@mui/icons-material";
import React from "react";
import {
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton,
    List,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldPreviewPanel} from "./FieldPreviewPanel.tsx";
import {IconField} from "./IconField.tsx";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectAttrbiuteInput source="type"/>,
    <SelectAttrbiuteInput source="group"/>

];
const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.latest ? <EditButton/> : null;
};

export const FieldList = () =>
    (
        <List
            actions={<FieldListActions/>}
            filters={filters}
            filterDefaultValues={{latest: true}}
            queryOptions={{
                meta: {
                    sort: [
                        {field: 'group', order: 'ASC'},
                        {field: 'label', order: 'ASC'}
                    ]
                }
            }}
        >
            <Datagrid expand={FieldPreviewPanel}>
                <IconField source="type" label="Type" iconMapping={{
                    text: Abc,
                    pattern: EmergencyRecording,
                    choice: ListAlt,
                    taxon: PestControlRodent,
                    ontology: Share,
                }}/>
                <TextField source="label"/>
                <TextField source="group" label="Field Group"/>
                <TextField source="version"/>
                <ConditionalEditButton/>
            </Datagrid>
        </List>
    );
