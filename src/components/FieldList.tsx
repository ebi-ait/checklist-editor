import {Datagrid, ListContextProvider, TextField, useRecordContext} from "react-admin";
import React, {useMemo} from "react";
import {FieldProps} from "../model/Field.tsx";
import {Abc, RadioButtonChecked, RadioButtonUnchecked, Reorder, Spellcheck} from "@mui/icons-material";
import {IconField, IconMapping} from "./IconField.tsx";

export const FieldList = () => {
    const record = useRecordContext();

    const characteristics = record?.schema?.properties?.characteristics;
    const properties = characteristics?.properties;
    if (!properties) return null;

    function isMandatoryField(label: string) {
        if (characteristics.allOf.flatMap(x => x.oneOf).map(x => x.required).flatMap(x => x).includes(label)) {
            return "mandatory";
        } else {
            return "optional";
        }
    }

    function fieldType(label: string) {
        const textAttribute = characteristics.properties[label].items.properties.text;
        if (textAttribute.hasOwnProperty('enum')) {
            return 'choice';
        } else if (textAttribute.hasOwnProperty('pattern')) {
            return 'pattern';
        } else {
        return "text";
     }
    }

    function schemaToFieldList() {
        return Object.entries(properties)
            .map(([label, field]) => ({
                id: label,
                label,
                mandatory: isMandatoryField(label),
                type: fieldType(label)

            } as FieldProps));
    }

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
                <IconField source="mandatory" iconMapping={mandatoryIconMapping}/>
                <IconField source="type" iconMapping={fieldTypeIconMapping}/>
                {/*<TextField source="description" label="Description" />*/}
                {/*<TextField source="cardinality" label="Cardinality" />*/}
            </Datagrid>
        </ListContextProvider>
    );
};

const mandatoryIconMapping:IconMapping = {
    mandatory: RadioButtonChecked,
    optional: RadioButtonUnchecked,
};
const fieldTypeIconMapping:IconMapping = {
    text: Abc,
    choice: Reorder,
    pattern: Spellcheck
};
