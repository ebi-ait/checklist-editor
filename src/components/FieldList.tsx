import {
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton,
    List,
    SearchInput,
    SelectInput,
    TextField,
    TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {FieldPreviewPanel} from "./FieldPreviewPanel.tsx";
import {SelectAttrbiuteInput} from "./SelectAttrbiuteInput.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
    <SelectInput source="latest"
                 choices={[{id: true, name: 'True'}, {id: false, name: 'False'}]}/>,
    <SelectAttrbiuteInput source="type"/>,
    <SelectAttrbiuteInput source="group"/>

];
const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.latest ? <EditButton/> : null;
};

export const FieldList = () =>
    (
        <List
            actions={<FieldListActions/>}
            filters={filters}
            filterDefaultValues={{latest: true}}
            queryOptions={{
                meta: {
                    sort: [
                        {field: 'group', order: 'ASC'},
                        {field: 'label', order: 'ASC'}
                    ]
                }
            }}
        >
            <Datagrid expand={FieldPreviewPanel}>
                <FieldTypeIcon/>
                <TextField source="label"/>
                <TextField source="group" label="Field Group"/>
                <TextField source="version"/>
                <ConditionalEditButton/>
            </Datagrid>
        </List>
    );
