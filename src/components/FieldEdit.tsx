import {Edit, SimpleForm, TextInput, useRecordContext} from "react-admin";

// Custom input component based on 'type' attribute
const CustomConditionalInput = () => {
    const record = useRecordContext(); // Access the current record being edited

    if (!record) return null;

    // Check the value of 'type' and return different input controls
    switch (record.type) {
        case 'choice':
            return <TextInput source="choices"/>;
        case 'pattern':
            return <TextInput source="pattern"/>;
        default:
            return null; // Or provide a default input if necessary
    }
};


export const FieldEdit = () =>
    (
        <Edit>
            <SimpleForm>
                <TextInput source="name"/>
                <TextInput source="label"/>
                <TextInput source="type"/>
                <CustomConditionalInput/>
            </SimpleForm>
        </Edit>
    );
