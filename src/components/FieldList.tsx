import React from "react";
import {
    CreateButton,
    DatagridConfigurable,
    DateField,
    EditButton,
    FilterButton,
    List,
    ReferenceField,
    SearchInput,
    SelectColumnsButton,
    SelectInput,
    TextField,
    TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldPreviewPanel} from "./FieldPreviewPanel.tsx";
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
        <SelectColumnsButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="searchIndex" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectAttrbiuteInput source="type"/>,
    <SelectAttrbiuteInput source="lastModifedBy"/>,
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
            sort={{field: 'lastModifiedDate', order: 'DESC'}}
            queryOptions={{
                meta: {
                    sort: [
                        {field: 'group', order: 'ASC'},
                        {field: 'label', order: 'ASC'}
                    ]
                }
            }}
        >
            <DatagridConfigurable expand={FieldPreviewPanel}>
                <FieldTypeIcon/>
                <TextField source="label"/>
                <ReferenceField source="group"
                                reference="fieldGroups"
                                label="Group"
                                link={"show"}>
                    <TextField source="name"/>
                </ReferenceField>
                <TextField source="version"/>
                <TextField source="lastModifiedBy"/>
                <DateField source="lastModifiedDate" showTime/>
                <ConditionalEditButton/>
            </DatagridConfigurable>
        </List>
    );
