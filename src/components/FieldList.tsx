import React from "react";
import {
    CanAccess, CloneButton,
    CreateButton,
    Datagrid, DateField,
    EditButton,
    FilterButton,
    List, ReferenceField,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {FieldPreviewPanel} from "./FieldPreviewPanel.tsx";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="searchIndex" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectAttrbiuteInput source="type"/>,
    <SelectAttrbiuteInput source="group"/>

];
export const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.latest ? <EditButton/> : null;
};

export const FieldList = () =>
    (
        <List
            actions={<FieldListActions/>}
            filters={filters}
            filterDefaultValues={{latest: true}}
            sort={{ field: 'lastModifiedDate', order: 'DESC' }}
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
                <FieldTypeIcon/>
                <TextField source="label"/>
                <ReferenceField source="group"
                                reference="fieldGroups"
                                label="Group">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="version"/>
                <DateField source="lastModifiedDate" showTime/>
                <ConditionalEditButton/>
            </Datagrid>
        </List>
    );
