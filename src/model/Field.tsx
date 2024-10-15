export interface FieldProps {
    id?: string;
    name: string;
    version: string;
    label: string;
    description?: string;
    mandatory: 'mandatory' | 'optional' | 'recommended';
    requirementType: 'single' | 'multiple';
    type: 'text' | 'pattern' | 'choice';
    usedBySchemas: string[];
}
