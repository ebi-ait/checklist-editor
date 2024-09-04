import {
    Create,
    SimpleForm,
    TextInput,
    useRecordContext} from "react-admin";

export const FieldCreate = () => {
    const record = useRecordContext();
    const type = record.type

    return (
        <Create>
            <SimpleForm>
                <TextInput source="name"/>
                <TextInput source="label"/>
                <TextInput source="type"/>
                {type === 'choice' && (
                    <TextInput source="choices" />
                )}
                {type === 'pattern' && (
                    <TextInput source="pattern"/>
                )}
            </SimpleForm>
        </Create>
    );
};
