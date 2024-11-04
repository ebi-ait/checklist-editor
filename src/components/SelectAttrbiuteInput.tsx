import React, {useEffect, useState} from "react";
import {SelectInput, useDataProvider, useResourceContext} from "react-admin";

export const SelectAttrbiuteInput = (props) => {
    const dataProvider = useDataProvider();
    const resource = useResourceContext();
    const [choices, setChoices] = useState([]);
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const {data} = await dataProvider.getAttributeValues(resource, props.source);
                setChoices(data);
            } catch (error) {
                console.error(`Error fetching select options for ${resource}.${props.source}:`, error);
            }
        };

        fetchOptions();
    }, [dataProvider]);

    return <SelectInput {...props}
                        choices={choices}
                        optionText="id"
    />;
};
