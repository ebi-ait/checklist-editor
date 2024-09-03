
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

interface SchemaFieldAssociation {
    "cardinality": "OPTIONAL"|"MANDATORY"|"RECOMMENDED"
    "fieldId": string;
    "multiplicity": "Single"|"List"
}

export interface ChecklistProps {
    id: string;
    name: string;
    accession: string;
    version: string;
    title: string;
    description: string;
    schema: ChecklistSchema;
    schemaFieldAssociations: SchemaFieldAssociation[];
}

