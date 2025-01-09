import {Create} from "react-admin";
import {ChecklistForm} from "./ChecklistEdit.tsx";

const mandatoryFields = () => ({  schemaFieldAssociations : [
        {
            "fieldId": "collection_date:1.0",
            "requirementType": "MANDATORY",
            "multiplicity": "Single"
        },
        {
            "fieldId": "geographic_location_country_andor_sea:1.0",
            "requirementType": "MANDATORY",
            "multiplicity": "Single"
        }
    ]});
export const ChecklistCreate = props => (
    <Create {...props}>
        <ChecklistForm mandatoryFields={mandatoryFields}/>
    </Create>
);
