import {Abc, PestControlRodent, AccountTree, EmergencyRecording} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import {IconField} from "./IconField.tsx";

export const FieldTypeIcon = () =>
    <IconField source="type"
               label="Type"
               iconMapping={{
                   text: Abc,
                   pattern: EmergencyRecording,
                   choice: ListIcon,
                   taxon: PestControlRodent,
                   ontology: AccountTree,
               }}/>;
