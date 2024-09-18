import {useEffect} from "react";
import {
    CreateButton,
    Datagrid,
    DateField,
    EditButton,
    FilterButton, FunctionField,
    List,
    RichTextField,
    SearchInput,
    SelectInput,
    SimpleShowLayout,
    TextField,
    TextInput,
    TopToolbar,
    UrlField, useListContext, useRecordContext,
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
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
    <SelectInput source="editable"
                 choices={[{id:true,name:'True'}, {id:false,name:'False'}]}/>
];

const ConditionalEditButton = () => {
    const record = useRecordContext();
    return record && record.editable ? <EditButton/> : null;
};
export const ChecklistList = () => {
    return (
        <List
            actions={<SchemaListActions/>}
            filters={filters}
            filterDefaultValues={{ editable: true }}
        >
            <Datagrid expand={SchemaPreviewPanel}>
                <TextField source="title"/>
                <TextField source="accession"/>
                <TextField source="version"/>
                <DateField source="lastModifiedDate" showTime/>
                <FunctionField
                    label="Field Count"
                    render={record => record.schemaFieldAssociations?.length ?? 0}
                />
                <ConditionalEditButton/>
            </Datagrid>
        </List>
    );
};


