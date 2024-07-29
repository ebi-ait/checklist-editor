import {
    ArrayField, ChipField,
    Datagrid,
    Labeled,
    ReferenceManyField,
    Show,
    SimpleShowLayout, SingleFieldList,
    TextField,
    useRecordContext
} from "react-admin";
import React from "react";
import {IconField} from "./IconField.tsx";
import {Abc, RadioButtonChecked, RadioButtonUnchecked, Reorder, Spellcheck} from "@mui/icons-material";

const FieldPanel = () => {
    const record=useRecordContext();
    return (
        <SimpleShowLayout>
            {record.type === 'choice' && (
                <ArrayField source="choices">
                    <SingleFieldList linkType={false}>
                        <ChipField source="choice" />
                    </SingleFieldList>
                </ArrayField>
            )}
            {record.type === 'pattern' && (
                <TextField source="pattern"/>
            )}
        </SimpleShowLayout>
    );
}
/**
 * Fetch a book from the API and display it
 */
export const ChecklistShow = () => {
    return (
        <Show emptyWhileLoading>
            <SimpleShowLayout>
                <Labeled label="Title">
                    <TextField source="title"/>
                </Labeled>
                <ReferenceManyField reference="fields"
                                    target="schema_id"
                >
                    <Datagrid expand={FieldPanel}>
                        <TextField source="label"/>
                        <IconField source="mandatory" iconMapping={{
                            mandatory: RadioButtonChecked,
                            optional: RadioButtonUnchecked,
                        }}/>
                        <IconField source="type" iconMapping={{
                            text: Abc,
                            choice: Reorder,
                            pattern: Spellcheck
                        }}/>
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    );
};
