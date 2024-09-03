import React from 'react';
import {QueryClient} from '@tanstack/react-query';

import {Admin, Resource} from 'react-admin';
import {FieldList} from "./components/FieldList.tsx";
import checklistDataProvider from './dataprovider/schemaStoreDataProvider.tsx';
import {ChecklistList} from "./components/ChecklistList.tsx";
import {ChecklistShow} from "./components/ChecklistShow.tsx";
import {appTheme} from "./theme.tsx";
import {ChecklistEdit} from "./components/ChecklistEdit.tsx";
import {FieldEdit} from "./components/FieldEdit.tsx";
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
                theme={appTheme}
        >
            <Resource name="checklists"
                      list={ChecklistList}
                      show={ChecklistShow}
                      edit={ChecklistEdit}

            />
            <Resource name="fields"
                      list={FieldList}
                      edit={FieldEdit}
            />
        </Admin>
    );
};

export default App;
