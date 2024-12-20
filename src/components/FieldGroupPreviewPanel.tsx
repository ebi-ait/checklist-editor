import {DateField, Pagination, ReferenceArrayField, SimpleShowLayout} from "react-admin";

export const FieldGroupPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <DateField source="lastModifiedDate"/>
            <ReferenceArrayField label="Fields"
                                 reference="fields"
                                 source="fields"
                                 perPage={10}
                                 pagination={<Pagination labelRowsPerPage={""}
                                                         hidePrevButton hideNextButton
                                                         size="small"/>}>
            </ReferenceArrayField>
        </SimpleShowLayout>
    )
}
