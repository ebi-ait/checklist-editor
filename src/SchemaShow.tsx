import {Labeled, Show, SimpleShowLayout, TextField} from "react-admin";
import {FieldList} from "./FieldList.tsx";
import React from "react";

/**
 * Fetch a book from the API and display it
 */
export const SchemaShow = () => {
    return (
        <Show emptyWhileLoading>
            <SimpleShowLayout>
                <Labeled label="Title">
                    <TextField source="title"/>
                </Labeled>
                <FieldList/>
            </SimpleShowLayout>
        </Show>
    );
};
