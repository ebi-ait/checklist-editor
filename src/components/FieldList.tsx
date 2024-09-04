import {
    ChipField, CreateButton, Datagrid,
    EditButton, FilterButton, List, ReferenceArrayField, SelectColumnsButton, SingleFieldList, TextField, TopToolbar
} from 'react-admin';

const FieldListActions = () => (
    <TopToolbar>
        {/*<FilterButton/>*/}
        <SelectColumnsButton/>
        <CreateButton/>
    </TopToolbar>
);
export const FieldList = () => {
    // const record = useRecordContext();
    // const type = record.type
    return (
        <List actions={<FieldListActions/>}>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="label"/>
                <TextField source="description"/>
                <TextField source="type"/>
                {/*{type === 'choice' && (*/}
                {/*    <TextField source="choices"/>*/}
                {/*)}*/}
                {/*{type === 'pattern' && (*/}
                {/*    <TextField source="pattern"/>*/}
                {/*)}*/}
                <ReferenceArrayField label="Used by Checklists" reference="checklists" source="usedBySchemas">
                    <SingleFieldList>
                        <ChipField source="accession" />
                    </SingleFieldList>
                </ReferenceArrayField>
                <EditButton />
            </Datagrid>
        </List>
    );
};
