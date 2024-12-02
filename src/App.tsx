import ChecklistIcon from '@mui/icons-material/Checklist';
import ListIcon from '@mui/icons-material/List';
import PeopleIcon from '@mui/icons-material/People';
import {QueryClient} from '@tanstack/react-query';
import React from 'react';

import {Admin, Resource} from 'react-admin';
import webinAuthProvider from "./authprovider/webinAuthProvider.tsx";
import {ChecklistCreate} from "./components/ChecklistCreate.tsx";
import {ChecklistEdit} from "./components/ChecklistEdit.tsx";
import {ChecklistList} from "./components/ChecklistList.tsx";
import {ChecklistShow} from "./components/ChecklistShow.tsx";
import {FieldCreate} from "./components/FieldCreate.tsx";
import {FieldEdit} from "./components/FieldEdit.tsx";
import {FieldList} from "./components/FieldList.tsx";
import checklistDataProvider from './dataprovider/schemaStoreDataProvider.tsx';
import {appTheme, darkTheme} from "./theme.tsx";
import {UserCreate, UserEdit, UserList, UserShow} from "./components/User.tsx";

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                cacheTime: 0, // Disable cache
                // staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (
        <Admin dataProvider={checklistDataProvider}
               authProvider={webinAuthProvider}
               queryClient={queryClient}
               theme={appTheme}
               darkTheme={darkTheme}
               disableTelemetry
        >
            <Resource name="checklists"
                      list={ChecklistList}
                      show={ChecklistShow}
                      edit={ChecklistEdit}
                      create={ChecklistCreate}
                      icon={ChecklistIcon}
            />
            <Resource name="fields"
                      list={FieldList}
                      edit={FieldEdit}
                      create={FieldCreate}
                      icon={ListIcon}
            />
            <Resource name="users" list={UserList}
                      edit={UserEdit}
                      show={UserShow}
                      create={UserCreate}
                      icon={PeopleIcon}/>

        </Admin>
    );
};

export default App;
