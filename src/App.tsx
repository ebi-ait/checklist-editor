import React from 'react';
import {QueryClient} from '@tanstack/react-query';

import {Admin, Resource} from 'react-admin';
import checklistDataProvider from './schemaStoreDataProvider.tsx';
import {ChecklistList} from "./components/ChecklistList.tsx";
import {ChecklistShow} from "./components/ChecklistShow.tsx";
import {appTheme} from "./theme.tsx";
const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (
        <Admin dataProvider={checklistDataProvider}
               queryClient={queryClient}
                theme={appTheme}>
            <Resource name="checklists" list={ChecklistList} show={ChecklistShow}/>
        </Admin>
    );
};

export default App;
