import React, {useEffect, useState} from "react";
import {Loading, SelectInput, useDataProvider, useResourceContext} from "react-admin";

export const SelectAttributeInput = (props) => {
    const dataProvider = useDataProvider();
    const resource = useResourceContext();
    const [choices, setChoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOptions = async () => {
            setLoading(true);
            try {
                const { data } = await dataProvider.getAttributeValues(resource, props.source);
                setChoices(data);
            } catch (error) {
                console.error(`Error fetching select options for ${resource}.${props.source}:`, error);
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [dataProvider, resource, props.source]);

    if (loading) return <Loading/>
    return (
        <SelectInput
            {...props}
            choices={choices}
            optionText="id"
            emptyValue=""
            disabled={loading}
        />
    );
};
