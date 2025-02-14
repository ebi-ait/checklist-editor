import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {Login, LoginForm} from "react-admin";

export const LoginPage = (props) => {
    return (
        <Login {...props}>
            <Card>
                <CardContent>
                    <Typography variant="h5">Welcome to The Checklist Editor</Typography>
                    <Typography>Please use your Webin credentials. </Typography>
                    <Typography variant={"small"}>For editor credentials,
                        contact ENA/BioSamples teams.</Typography>
                    <LoginForm className="centered-login-form"/>
                </CardContent>
            </Card>
        </Login>
    );
};
