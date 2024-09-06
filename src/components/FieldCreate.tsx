import {Create, RadioButtonGroupInput, SimpleForm, TextInput} from "react-admin";
import {useWatch} from 'react-hook-form';

export const FieldCreate = (props) => {
    const selectedType = useWatch({name: 'type'});

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name"/>
                <TextInput source="label"/>
                <RadioButtonGroupInput source="type"
                                       choices={[
                                           {id: 'choice', name: 'Choice'},
                                           {id: 'pattern', name: 'Pattern'},
                                       ]}
                />
                {selectedType === 'choice' && (
                    <TextInput source="choices"/>
                )}
                {selectedType === 'pattern' && (
                    <TextInput source="pattern"/>
                )}
            </SimpleForm>
        </Create>
    );
};
