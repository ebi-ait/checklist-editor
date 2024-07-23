import {Datagrid, ListContextProvider, TextField, useRecordContext} from "react-admin";
import React, {useMemo} from "react";
import {FieldProps} from "../model/Field.tsx";
import {SvgIconProps} from "@mui/material";
import {CheckCircle, Error, ErrorOutline, RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";

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

    function schemaToFieldList() {
        return Object.entries(properties)
            .map(([label, field]) => ({
                id: label,
                label,
                mandatory: isMandatoryField(label)

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
                <TextField source="label" label="Label"/>
                {/*<TextField source="name" label="Name" />*/}
                <MandatoryIconField label="Mandatory" />
                {/*<TextField source="description" label="Description" />*/}
                {/*<TextField source="cardinality" label="Cardinality" />*/}
            </Datagrid>
        </ListContextProvider>
    );
};

const MandatoryIconField = (props: SvgIconProps) => {
    debugger;
    const record = useRecordContext();

    if (!record) return null;

    return record.mandatory === 'mandatory' ? (
        <RadioButtonChecked {...props} color="primary" />
    ) : (
        <RadioButtonUnchecked {...props} color="primary" />
    );
};
