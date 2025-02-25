import {OpenInNew} from "@mui/icons-material";
import get from "lodash/get"; // Import lodash.get for safe nested access
import {Button, DateField, WrapperField, RichTextField, SimpleShowLayout, TextField, useRecordContext, UrlField} from "react-admin";

const LinkButtonField = ({source, label, content}) => {
    const record = useRecordContext();
    if (!record) return null;

    const value = source ? get(record, source) : null;
    console.log(`label: ${label}`);
    const link = value;

    if (!link) return null; // Don't render the button if no link is available

    return (
        <Button
            href={link}
            // variant="contained"
            target="_new"
            rel="noopener noreferrer"
            color="secondary"
            startIcon={<OpenInNew/>}
            label={content}
        >
        </Button>
    );
};

export default LinkButtonField;


export const ChecklistPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <TextField source="name"/>
            <RichTextField source="description"/>
            <SimpleShowLayout direction="row" spacing={5}>
                <TextField source={"version"}/>
                <TextField source="lastModifiedBy"/>
                <DateField source="lastModifiedDate" showTime/>
            </SimpleShowLayout>
            <WrapperField>
                <LinkButtonField source="_links.self.href" label={false} content={"Checklist API Resource Link"}/>
                <LinkButtonField source="_links.json-schema.href" label={false} content={"Download Json Schema for Checklist"}/>
            </WrapperField>
        </SimpleShowLayout>
    );
};
