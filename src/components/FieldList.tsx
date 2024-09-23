import {
    ChipField,
    CreateButton,
    Datagrid, DateField,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    ReferenceArrayField,
    SearchInput,
    SingleFieldList,
    TextField,
    TopToolbar
} from 'react-admin';

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
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
                <TextField source="group" label ="Field Group"/>
                <TextField source="type"/>
                <DateField source="lastModifiedDate"/>

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
