import {
    Count,
    CreateButton,
    Datagrid,
    EditButton,
    FilterButton, FunctionField,
    List,
    ReferenceManyCount,
    RichTextField,
    SearchInput,
    SelectColumnsButton,
    SimpleShowLayout,
    TextField,
    TopToolbar,
    UrlField,
} from "react-admin";


const SchemaPreviewPanel = () => {
    return (
        <SimpleShowLayout>
            <TextField source="name"/>
            <RichTextField source="description"/>
            <UrlField source="_links.self.href"/>
        </SimpleShowLayout>
    );
};

const SchemaListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <SelectColumnsButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
];
export const ChecklistList = () => (
    <List
          actions={<SchemaListActions/>}
          filters={filters}
    >
        <Datagrid expand={SchemaPreviewPanel}>
            <TextField source="title"/>
            <TextField source="accession"/>
            <TextField source="version"/>
            <FunctionField
                label="Field Count"
                render={record => record.schemaFieldAssociations?.length ?? 0}
            />
            <EditButton />
        </Datagrid>
    </List>
);


