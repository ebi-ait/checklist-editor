import {Datagrid, ListContextProvider, TextField, useRecordContext} from "react-admin";
import React, {useMemo} from "react";

export const FieldList = () => {
    const record = useRecordContext();

    const properties = record?.schema?.properties?.characteristics?.properties;
    if (!properties) return null;
    const fieldArray = useMemo(() =>
        Object.entries(properties).map(([label, field]) => ({
            id: label,
            label,
        })), [properties]);

    const listContext = useMemo(() => ({
        data: fieldArray,
        ids: fieldArray.map(field => field.id),
    }), [fieldArray]);
    return (
        <ListContextProvider value={listContext}>
            <Datagrid>
                <TextField source="label" label="Label"/>
                {/*<TextField source="name" label="Name" />*/}
                {/*<TextField source="description" label="Description" />*/}
                {/*<TextField source="mandatory" label="Mandatory" />*/}
                {/*<TextField source="cardinality" label="Cardinality" />*/}
            </Datagrid>
        </ListContextProvider>
    );
};
