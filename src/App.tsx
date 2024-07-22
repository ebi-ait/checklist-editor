import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import dataProvider from './dataProvider';

const App: React.FC = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="schemas" list={ListGuesser} />
    </Admin>
);

export default App;
