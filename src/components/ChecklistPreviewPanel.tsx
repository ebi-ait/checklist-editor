import {RichTextField, SimpleShowLayout, TextField, UrlField} from "react-admin";

export const ChecklistPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <TextField source="name"/>
            <RichTextField source="description"/>
            <UrlField source="_links.self.href"/>
        </SimpleShowLayout>
    );
};
