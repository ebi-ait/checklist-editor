import {PriorityHigh, Recommend, ViewHeadline} from "@mui/icons-material";
import {TablePagination,
    TextField as MuiTextField
} from "@mui/material";
import get from "lodash/get";
import {useState} from "react";
import {Datagrid, ReferenceField, TextField, useRecordContext} from "react-admin";
import {FieldTypeIcon} from "./FieldTypeIcon.tsx";
import {IconField} from "./IconField.tsx";

export const PaginatedListField = (props) => {
    const {source} = props;
    const record = useRecordContext();
    const items = get(record, source) || [];

    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);
    const [filter, setFilter] = useState('');

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(0); // Reset to first page when filtering
    };

    // Apply filtering (case-insensitive search on 'name')
    const filteredItems = items.filter(item => item.fieldId.toLowerCase().includes(filter.replace(' ','_').toLowerCase()));
    return (
        <>
            <MuiTextField
                label="Filter"
                variant="outlined"
                size="small"
                fullWidth
                value={filter}
                onChange={handleFilterChange}
                style={{ marginBottom: '1rem' }}
            />
            <Datagrid data={filteredItems.slice(page * rowsPerPage, (page + 1) * rowsPerPage)} rowClick="false"
                      bulkActionButtons={false}>
                <ReferenceField source="fieldId" reference="fields"
                                queryOptions={{meta: {parentId: record.id}}}>
                    <TextField source="label"/>
                </ReferenceField>
                <ReferenceField label="Type" source="fieldId" reference="fields" link={false}
                                queryOptions={{meta: {parentId: record.id}}}>
                    <FieldTypeIcon/>
                </ReferenceField>
                <ReferenceField label="Version" source="fieldId" reference="fields" link={false}
                                queryOptions={{meta: {parentId: record.id}}}>
                    <TextField source="version"/>
                </ReferenceField>
                <ReferenceField label="Group" source="fieldId" reference="fields" link={false}
                                queryOptions={{meta: {parentId: record.id}}}>
                    <ReferenceField source="group"
                                    reference="fieldGroups"
                                    label="Group">
                        <TextField source="name"/>
                    </ReferenceField>
                </ReferenceField>
                <IconField source="requirementType" label="Required" iconMapping={{
                    MANDATORY: PriorityHigh,
                    OPTIONAL: null,
                    RECOMMENDED: Recommend,
                }}/>
                <IconField source="multiplicity" iconMapping={{
                    Single: null,
                    List: ViewHeadline,
                }}/>
            </Datagrid>
            <TablePagination
                component="div"
                count={filteredItems.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </>
    );
};
