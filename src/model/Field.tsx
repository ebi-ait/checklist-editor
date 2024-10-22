export interface FieldProps {
    id?: string;
    name: string;
    version: string;
    label: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    multiplicity: 'single' | 'multiple';
    type: 'text' | 'pattern' | 'choice';
    usedBySchemas: string[];
}
