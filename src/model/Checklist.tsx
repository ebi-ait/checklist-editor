import {FieldProps} from './Field'

interface Characteristics {
    properties: object;
    allOf: object[];
}

interface Properties {
    // TODO: add details of the internal strucure
    characteristics: Characteristics;
    characteristics1: Characteristics;
}

interface ChecklistSchema {
    properties: Properties;
}

export interface ChecklistProps {
    id: string;
    name: string;
    version: string;
    title: string;
    description: string;
    fields: FieldProps;
    schema: ChecklistSchema;
}

