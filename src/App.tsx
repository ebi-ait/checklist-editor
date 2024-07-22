import React from 'react';
import { QueryClient } from '@tanstack/react-query';

import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import {SchemaList, SchemaShow} from "./SchemaList.tsx";

const App: React.FC = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (
        <Admin dataProvider={dataProvider}
               queryClient={queryClient}>
            <Resource name="schemas" list={SchemaList} show={SchemaShow}/>
        </Admin>
    );
};

export default App;
