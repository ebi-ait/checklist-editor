import React from "react";
import {
    ChipField,
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton,
    List,
    ReferenceArrayField,
    SearchInput,
    SelectColumnsButton,
    SingleFieldList,
    TextField, TextInput,
    TopToolbar
} from 'react-admin';

const FieldListActions = () => (
    <TopToolbar>
        {/*<FilterButton/>*/}
        <SelectColumnsButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
];

export const FieldList = () => {
    return (
        <List actions={<FieldListActions/>}
              filters={filters}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="label"/>
                <TextField source="description"/>
                <TextField source="group"/>
                <TextField source="type"/>
                <ReferenceArrayField label="Used by Checklists"
                                     reference="checklists"
                                     source="usedBySchemas">
                    <SingleFieldList>
                        <ChipField source="accession" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <EditButton />
            </Datagrid>
        </List>
    );
};
