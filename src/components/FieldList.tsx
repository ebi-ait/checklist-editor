import { Datagrid, List, TextField } from 'react-admin';

export const FieldList = () => {
    const record = useRecordContext();
    const type = record.type
    return (
        <List>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="label"/>
                <TextField source="description"/>
                {/*<TextField source="usedBySchemas"/>*/}
                <TextField source="type"/>
                {type === 'choice' && (
                    <TextField source="choices"/>
                )}
                {type === 'pattern' && (
                    <TextField source="pattern"/>
                )}
            </Datagrid>
        </List>
    );
};
