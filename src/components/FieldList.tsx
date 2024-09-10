import React from "react";
import {
    ChipField,
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton,
    FunctionField,
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

export const FieldList = () =>
    (
        <List actions={<FieldListActions/>}
              filters={filters}>
            <Datagrid>
                <TextField source="label"/>
                <TextField source="description"/>
                <TextField source="group"/>
                <TextField source="type"/>
                <ReferenceArrayField label="Used by Checklists"
                                     reference="checklists"
                                     source="usedBySchemas">
                    <SingleFieldList>
                        <FunctionField
                            source="accession"
                            render={record =>
                                <ChipField record={record}
                                           defaultValue={`${record.accession}:${record.version}`}
                                />
                            }/>
                    </SingleFieldList>
                </ReferenceArrayField>
                <EditButton/>
            </Datagrid>
        </List>
    );
