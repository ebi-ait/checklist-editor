import {
    ArrayField,
    ChipField,
    Datagrid,
    EditButton,
    Labeled,
    ReferenceField,
    Show,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    useRecordContext
} from "react-admin";
import React from "react";
import {IconField} from "./IconField.tsx";
import {LooksOne, RadioButtonChecked, RadioButtonUnchecked, ViewHeadline} from "@mui/icons-material";

const FieldPanel = () => {
    const record = useRecordContext();
    return (
        <SimpleShowLayout>
            {record.type === 'choice' && (
                <ArrayField source="choices">
                    <SingleFieldList linkType={false}>
                        <ChipField source="choice"/>
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
                <Labeled>
                    <TextField source="title"/>
                </Labeled>
                <Labeled>
                    <TextField source="description"/>
                </Labeled>
                <Labeled>
                    <ArrayField source="schemaFieldAssociations">
                        <Datagrid>
                            <ReferenceField source="fieldId" reference="fields" link={false}>
                                <TextField source="label"/>
                            </ReferenceField>
                            <ReferenceField label="Type" source="fieldId" reference="fields" link={false}>
                                <TextField source="type"/>
                            </ReferenceField>
                            <IconField source="cardinality" iconMapping={{
                                MANDATORY: RadioButtonChecked,
                                OPTIONAL: RadioButtonUnchecked,
                            }}/>
                            <IconField source="multiplicity" iconMapping={{
                                Single: LooksOne,
                                List: ViewHeadline,
                            }}/>
                            <EditButton/>
                        </Datagrid>
                    </ArrayField>
                </Labeled>
                {/*<ReferenceManyField reference="fields"*/}
                {/*                    target="schemaId" >*/}
                {/*    <Datagrid expand={FieldPanel}>*/}
                {/*        <TextField source="label"/>*/}
                {/*        <IconField source="mandatory" iconMapping={{*/}
                {/*            mandatory: RadioButtonChecked,*/}
                {/*            optional: RadioButtonUnchecked,*/}
                {/*        }}/>*/}
                {/*        <EditButton />*/}
                {/*        <IconField source="type" iconMapping={{*/}
                {/*            text: Abc,*/}
                {/*            choice: Reorder,*/}
                {/*            pattern: Spellcheck*/}
                {/*        }}/>*/}
                {/*    </Datagrid>*/}
                {/*</ReferenceManyField>*/}
            </SimpleShowLayout>
        </Show>
    );
};
