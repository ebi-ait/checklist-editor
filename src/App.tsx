import ChecklistIcon from '@mui/icons-material/Checklist';
import ListIcon from '@mui/icons-material/List';
import {QueryClient} from '@tanstack/react-query';
import React from 'react';

import {Admin, Resource} from 'react-admin';
import {ChecklistCreate} from "./components/ChecklistCreate.tsx";
import {ChecklistEdit} from "./components/ChecklistEdit.tsx";
import {ChecklistList} from "./components/ChecklistList.tsx";
import {ChecklistShow} from "./components/ChecklistShow.tsx";
import {FieldCreate} from "./components/FieldCreate.tsx";
import {FieldEdit} from "./components/FieldEdit.tsx";
import {FieldList} from "./components/FieldList.tsx";
import checklistDataProvider from './dataprovider/schemaStoreDataProvider.tsx';
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
                theme={appTheme}
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
        </Admin>
    );
};

export default App;
