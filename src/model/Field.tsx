export interface FieldProps {
    id?: string;
    name: string;
    version: string;
    label: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    cardinality: 'single' | 'multiple';
    type: 'text' | 'pattern' | 'choice' | 'taxon' | 'ontology';
    usedBySchemas: string[];
    group:string;
}
