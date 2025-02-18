import {
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    SearchInput,
    TextField,
    TopToolbar,
    useRecordContext
} from 'react-admin';
import {FieldGroupPreviewPanel} from "./FieldGroupPreviewPanel.tsx";

const FieldGroupListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>

];
const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record ? <EditButton/> : null;
};

export const FieldGroupList = () =>
    (
        <List
            actions={<FieldGroupListActions/>}
            filters={filters}
            filterDefaultValues={{latest: true}}
            queryOptions={{
                meta: {
                    sort: [
                        {field: 'name', order: 'ASC'}
                    ]
                }
            }}
        >
            <Datagrid expand={FieldGroupPreviewPanel}>
                <TextField source="name"/>
                <FunctionField source="fields" label="# Fields" render={({fields}) => (fields == null ? 0 : fields.length)} />
                <TextField source="description"/>
                <ConditionalEditButton/>
            </Datagrid>
        </List>
    );
