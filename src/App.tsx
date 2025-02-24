import ChecklistIcon from '@mui/icons-material/Checklist';
import FieldGroupIcon from '@mui/icons-material/LibraryBooks'
import ListIcon from '@mui/icons-material/List';
import {QueryClient} from '@tanstack/react-query';
import React from 'react';

import {Admin, Layout, Resource} from 'react-admin';
import {initAnalyticsCollection, usePageTracking} from "./analytics.tsx";
import webinAuthProvider from "./authprovider/webinAuthProvider.tsx";
import {ChecklistCreate} from "./components/ChecklistCreate.tsx";
import {ChecklistEdit} from "./components/ChecklistEdit.tsx";
import {ChecklistList} from "./components/ChecklistList.tsx";
import {ChecklistShow} from "./components/ChecklistShow.tsx";
import {FieldCreate} from "./components/FieldCreate.tsx";
import {FieldEdit} from "./components/FieldEdit.tsx";
import {FieldGroupCreate} from "./components/FieldGroupCreate.tsx";
import {FieldGroupEdit} from "./components/FieldGroupEdit.tsx";
import {FieldGroupList} from "./components/FieldGroupList.tsx";
import {FieldGroupShow} from "./components/FieldGroupShow.tsx";
import {FieldList} from "./components/FieldList.tsx";
import {FieldShow} from "./components/FieldShow.tsx";
import checklistDataProvider from './dataprovider/schemaStoreDataProvider.tsx';
import {LoginPage} from "./LoginPage.tsx";
import {appTheme, darkTheme} from "./theme.tsx";

initAnalyticsCollection();

export const MyLayout = ({ children }) => {
    usePageTracking();
    return <Layout>{children}</Layout>;
}
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
               loginPage={LoginPage}
               requireAuth
               layout={MyLayout}
        >
            <Resource name="checklists"
                      list={ChecklistList}
                      show={ChecklistShow}
                      edit={ChecklistEdit}
                      create={ChecklistCreate}
                      icon={ChecklistIcon}
                      recordRepresentation={(record) => `${record.title} (${record.id})`}
            />
            <Resource name="fields"
                      list={FieldList}
                      show={FieldShow}
                      edit={FieldEdit}
                      create={FieldCreate}
                      icon={ListIcon}
                      recordRepresentation={(record) => `${record.name} (${record.id})`}
            />
            <Resource name="fieldGroups"
                      list={FieldGroupList}
                      show={FieldGroupShow}
                      edit={FieldGroupEdit}
                      create={FieldGroupCreate}
                      icon={FieldGroupIcon}
            />
            {/*<Resource name="users"*/}
            {/*          list={FieldGroupList}*/}
            {/*          // show={FieldGroupShow}*/}
            {/*          // edit={FieldGroupEdit}*/}
            {/*          // create={FieldGroupCreate}*/}
            {/*          icon={AccountBox}*/}
            {/*/>*/}
        </Admin>
    );
};

export default App;
