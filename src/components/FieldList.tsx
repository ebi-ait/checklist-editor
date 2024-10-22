import {Abc, PriorityHigh, EmergencyRecording, Recommend, PestControlRodent, ListAlt, Share} from "@mui/icons-material";
import {
    ChipField,
    CreateButton,
    Datagrid, DateField,
    EditButton,
    FilterButton,
    FunctionField,
    List,
    Pagination,
    ReferenceArrayField, ReferenceManyCount, RichTextField,
    SearchInput, SimpleShowLayout,
    SingleFieldList,
    TextField,
    TopToolbar
} from 'react-admin';
import {IconField} from "./IconField.tsx";

const FieldListActions = () => (
    <TopToolbar>
        <FilterButton/>
        <CreateButton/>
    </TopToolbar>
);

const filters = [
    <SearchInput source="q" alwaysOn/>,
];

const PreviewPanel = () => {
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

export const FieldList = () =>
    (
        <List actions={<FieldListActions/>}
              filters={filters}>
            <Datagrid expand={PreviewPanel}>
                <IconField source="type" label="Type" iconMapping={{
                    string: Abc,
                    pattern: EmergencyRecording,
                    choice: ListAlt,
                    taxon: PestControlRodent,
                    ontology: Share,
                }}/>
                <TextField source="label"/>
                <TextField source="group" label ="Field Group"/>
                <TextField source="version"/>
                <EditButton/>
            </Datagrid>
        </List>
    );
