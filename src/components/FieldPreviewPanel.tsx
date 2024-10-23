import {
    ChipField,
    DateField,
    FunctionField,
    Pagination,
    ReferenceArrayField,
    RichTextField,
    SimpleShowLayout,
    SingleFieldList
} from "react-admin";

export const FieldPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <RichTextField source="description"/>
            <DateField source="lastModifiedDate"/>

            <ReferenceArrayField label="Used by Checklists"
                                 reference="checklists"
                                 source="usedBySchemas"
                                 perPage={5}
                                 pagination={<Pagination labelRowsPerPage={""}
                                                         hidePrevButton hideNextButton
                                                         size="small"/>}>
                <SingleFieldList>
                    <FunctionField
                        source="accession"
                        render={record =>
                            <ChipField record={record}
                                       defaultValue={`${record.accession}:${record.version}`}
                            />
                        }/>
                </SingleFieldList>
            </ReferenceArrayField>
        </SimpleShowLayout>
    )
}
