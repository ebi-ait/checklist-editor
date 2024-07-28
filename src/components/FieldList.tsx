import {Datagrid, ListContextProvider, TextField, useRecordContext} from "react-admin";
import React, {useMemo} from "react";
import {FieldProps} from "../model/Field.tsx";
import {Abc, RadioButtonChecked, RadioButtonUnchecked, Reorder, Spellcheck} from "@mui/icons-material";
import {IconField} from "./IconField.tsx";

export const FieldList = () => {
    const record = useRecordContext();

    const characteristics = record?.schema?.properties?.characteristics;
    const properties = characteristics?.properties;
    if (!properties) return null;

    // this is how mandatory fields are represented in the ENA Sample checklist schema
    const isMandatoryField = (label: string) => {
        if (characteristics.allOf.flatMap(x => x.oneOf).map(x => x.required).flatMap(x => x).includes(label)) {
            return "mandatory";
        } else {
            return "optional";
        }
    };

    // this is how field types are represented  in the ENA Sample checklist schema
    const fieldType = (label: string) => {

        const textAttribute = characteristics.properties[label].items.properties.text;
        if (Object.prototype.hasOwnProperty.call(textAttribute, 'enum')) {
            return 'choice';
        } else if (Object.prototype.hasOwnProperty.call(textAttribute, 'pattern')) {
            return 'pattern';
        } else {
        return "text";
     }
    };

    const schemaToFieldList = () => Object.entries(properties)
        .map(([label, field]) => ({
            id: label,
            label,
            mandatory: isMandatoryField(label),
            type: fieldType(label)
        } as FieldProps));

    const fieldArray = useMemo(() =>
        schemaToFieldList(), [properties]);

    const listContext = useMemo(() => ({
        data: fieldArray,
        ids: fieldArray.map(field => field.id),
    }), [fieldArray]);
    return (
        <ListContextProvider value={listContext}>
            <Datagrid>
                <TextField source="label"/>
                {/*<TextField source="name" label="Name" />*/}
                <IconField source="mandatory" iconMapping={{
                    mandatory: RadioButtonChecked,
                    optional: RadioButtonUnchecked,
                }}/>
                <IconField source="type" iconMapping={{
                    text: Abc,
                    choice: Reorder,
                    pattern: Spellcheck
                }}/>
                {/*<TextField source="description" label="Description" />*/}
                {/*<TextField source="cardinality" label="Cardinality" />*/}
            </Datagrid>
        </ListContextProvider>
    );
};



