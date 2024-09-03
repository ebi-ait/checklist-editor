import {ChipField, Datagrid,
    EditButton, List, ReferenceArrayField, SingleFieldList, TextField, useRecordContext} from 'react-admin';

export const FieldList = () => {
    // const record = useRecordContext();
    // const type = record.type
    return (
        <List>
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
