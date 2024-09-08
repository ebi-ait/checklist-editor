export interface FieldProps {
    id?: string;
    label: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    cardinality: 'single' | 'multiple';
    type: 'text' | 'pattern' | 'choice';
    usedBySchemas: string[];
}
