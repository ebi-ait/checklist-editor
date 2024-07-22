import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';
import {SchemaList} from "./SchemaList.tsx";

const App: React.FC = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="schemas" list={SchemaList} />
    </Admin>
);

export default App;
