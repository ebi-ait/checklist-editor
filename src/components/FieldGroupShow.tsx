import {
    EditButton,
    Show,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    useRecordContext
} from "react-admin";
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";

const FieldGroupShowActions = () => {
    const record = useRecordContext();
    return (
        <TopToolbar>
              <EditButton />
        </TopToolbar>
    );
}
export const FieldGroupShow = () =>
    <Show emptyWhileLoading
          actions={<FieldGroupShowActions />}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <TextField source="description"/>
            <EditButton />
        </SimpleShowLayout>
    </Show>
