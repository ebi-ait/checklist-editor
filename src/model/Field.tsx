export interface FieldProps {
    id?: string;
    label: string;
    name: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    cardinality: 'single' | 'multiple';
}
