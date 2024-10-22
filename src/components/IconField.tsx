import {IconButton, SvgIconProps} from "@mui/material";
import React from "react";
import {useRecordContext} from "react-admin";

export interface IconMapping {
    [key: string]: React.ElementType<SvgIconProps>;
}

interface IconFieldProps extends SvgIconProps {
    iconMapping: IconMapping;
    source: string;
}

export const IconField: React.FC<IconFieldProps> = ({iconMapping, source}) => {
    const record = useRecordContext();
    if (!record) return null;
    const fieldValue = record[source];
    const IconComponent = iconMapping[fieldValue];
    if (!IconComponent) return null;

    return (
        <IconButton aria-label={{fieldValue}}>
            <IconComponent/>
        </IconButton>
    );
}

