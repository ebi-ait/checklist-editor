import React from 'react';
import { QueryClient } from '@tanstack/react-query';

import { Admin, Resource, ListGuesser } from 'react-admin';
import schemaStoreDataProvider from './schemaStoreDataProvider.tsx';
import {ChecklistList} from "./ChecklistList.tsx";
import {ChecklistShow} from "./ChecklistShow.tsx";

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (
        <Admin dataProvider={schemaStoreDataProvider}
               queryClient={queryClient}>
            <Resource name="schemas" list={ChecklistList} show={ChecklistShow}/>
        </Admin>
    );
};

export default App;
