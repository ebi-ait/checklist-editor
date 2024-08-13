import {CheckboxGroupInput, Edit, ReferenceArrayInput, SimpleForm, TextInput, useRecordContext} from "react-admin";
import React from "react";

export const FieldEdit = () => {
    const record = useRecordContext();
    const type = record.type

    return (
        <Edit>
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
        </Edit>
    );
};
