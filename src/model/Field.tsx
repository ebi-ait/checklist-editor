export interface FieldProps {
    id?: string;
            version: string;
    label: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    multiplicity: 'single' | 'multiple';
    type: 'text' | 'pattern' | 'choice' | 'taxon' | 'ontology';
    usedBySchemas: string[];
    latest: boolean;
    group: string;
}
