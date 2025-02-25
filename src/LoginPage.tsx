import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {Login, LoginForm} from "react-admin";

export const LoginPage = (props) => {
    return (
        <Login {...props}>
            <Card>
                <CardContent>
                    <Typography variant="h4" align="center">Samples Checklist Editor</Typography>
                    <Typography variant="subtitle2" align="center">Use ENA-Webin credentials to login </Typography>
                    <LoginForm className="centered-login-form"/>
                    <Typography variant="subtitle2" align="center">Contact ENA/BioSamples teams to request edit access</Typography>
                </CardContent>
            </Card>
        </Login>
    );
};
