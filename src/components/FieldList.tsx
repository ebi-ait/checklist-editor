import {Datagrid, ListContextProvider, TextField, useRecordContext} from "react-admin";
import React, {useMemo} from "react";
import {FieldProps} from "../model/Field.tsx";
import {SvgIconProps} from "@mui/material";
import {
    CheckCircle,
    Error,
    ErrorOutline,
    RadioButtonChecked,
    RadioButtonUnchecked, Reorder, Spellcheck,
    TextFields
} from "@mui/icons-material";

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
        return characteristics.properties[label].items.properties.text.hasOwnProperty('enum') ? 'choice' : "text";
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
                <MandatoryIconField source="mandatory" iconMapping={mandatoryIconMapping}/>
                <MandatoryIconField source="type" iconMapping={fieldTypeIconMapping}/>
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
    text: TextFields,
    choice: Reorder,
    pattern: Spellcheck
};
interface IconMapping {
    [key: string]: React.ElementType<SvgIconProps>;
}
interface MandatoryIconFieldProps extends SvgIconProps {
    iconMapping: IconMapping;
    source: string;
}
const MandatoryIconField: React.FC<MandatoryIconFieldProps> = ({iconMapping, source, props: SvgIconProps}) => {
    const record = useRecordContext();
    if (!record) return null;
    const fieldValue = record[source];
    const IconComponent = iconMapping[fieldValue];
    if (!IconComponent) return null;

    return <IconComponent />;
};
