import {ArrayInput, Edit, RadioButtonGroupInput, SelectInput, SimpleForm, SimpleFormIterator, TextInput} from "react-admin";
import {useWatch} from "react-hook-form";

const toChoices = items => items.map(item => ({ id: item, name: item }));

function ChoiceField() {
    return <ArrayInput source="choices">
        <SimpleFormIterator inline>
            <TextInput source="."/>
        </SimpleFormIterator>
    </ArrayInput>;
}

// Custom input component based on 'type' attribute
const CustomConditionalInput = () => {
    const type = useWatch({name:'type'}); // Access the current record being edited

    // Check the value of 'type' and return different input controls
    switch (type) {
        case 'text':
            return <TextInput source="text"/>;
        case 'choice':
            return <ChoiceField/>;
        case 'pattern':
            return <>
                <TextInput source="text"/>
                <TextInput source="pattern"/>
            </>;
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
                <RadioButtonGroupInput source="type"
                                       choices={[
                                           {id: 'text', name: 'Text'},
                                           {id: 'choice', name: 'Choice'},
                                           {id: 'pattern', name: 'Pattern'},
                                       ]}
                />
                <CustomConditionalInput/>
            </SimpleForm>
        </Edit>
    );
