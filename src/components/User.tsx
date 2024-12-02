import {
    ArrayField,
    ArrayInput,
    BooleanField,
    BooleanInput,
    CanAccess,
    ChipField,
    CloneButton,
    Create,
    Datagrid, DateField,
    Edit,
    EditButton,
    List,
    Show,
    SimpleForm,
    SimpleFormIterator,
    SimpleShowLayout,
    SingleFieldList,
    TextField,
    TextInput
} from "react-admin";

export const UserForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <>
        <TextInput source="username" disabled={isEdit} />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
        <ArrayInput source="authorities">
            <SimpleFormIterator>
                <TextInput source="authority" />
            </SimpleFormIterator>
        </ArrayInput>
        <BooleanInput source="enabled" />
        <BooleanInput source="accountNonExpired" />
        <BooleanInput source="accountNonLocked" />
        <BooleanInput source="credentialsNonExpired" />
    </>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <UserForm />
        </SimpleForm>
    </Create>
);

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <UserForm isEdit />
        </SimpleForm>
    </Edit>
);

export const UserShow = () => (
    <Show queryOptions={{meta: {searchResource: 'findByUsername'}}}>
        <SimpleShowLayout>
            <TextField source="username" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <ArrayField source="authorities">
                <SingleFieldList>
                    <ChipField source="authority" />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="enabled" />
            <BooleanField source="accountNonExpired" />
            <BooleanField source="accountNonLocked" />
            <BooleanField source="credentialsNonExpired" />
            <TextField source="createdBy" />
            <DateField source="createdDate" />
            <TextField source="lastModifiedBy" />
            <DateField source="lastModifiedDate" />
        </SimpleShowLayout>
    </Show>
);

export const UserList = () => (
    <List>
        <Datagrid>
            <TextField source="username" />
            <TextField source="firstName" />
            <TextField source="lastName" />
            <ArrayField source="authorities">
                <SingleFieldList>
                    <ChipField source="authority" />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="enabled" />
            <BooleanField source="accountNonExpired" />
            <BooleanField source="accountNonLocked" />
            <BooleanField source="credentialsNonExpired" />
            <TextField source="lastModifiedBy" />
            <DateField source="lastModifiedDate" />
            <EditButton/>
            <CanAccess action="create">
                <CloneButton/>
            </CanAccess>
        </Datagrid>
    </List>
);

