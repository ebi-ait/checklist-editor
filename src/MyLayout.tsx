import React from "react";
import {Layout} from "react-admin";

export const MyLayout = ({children}) => (
    <Layout sx={{
        '& .RaLayout-appFrame': {width: '100vw', padding: 1},
    }}>
        {children}
    </Layout>
);
