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
import {recordClickEvent} from "../analytics.tsx";
import {SelectAttributeInput} from "./SelectAttributeInput.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton onClick={recordClickEvent}/>
        <CreateButton onClick={recordClickEvent}/>
        <SelectColumnsButton onClick={recordClickEvent}/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="searchIndex" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectAttributeInput source="type"/>,
    <SelectAttributeInput source="lastModifedBy"/>,
    <SelectAttributeInput source="group"/>,
];

export const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.latest ? <EditButton onClick={recordClickEvent}/> : null;
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
