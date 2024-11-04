import {Abc, PestControlRodent} from "@mui/icons-material";
import {IoMdList} from "react-icons/io";
import {VscRegex, VscTypeHierarchySub} from "react-icons/vsc";
import {IconField} from "./IconField.tsx";

export const FieldTypeIcon = () =>
    <IconField source="type"
               label="Type"
               iconMapping={{
                   text: Abc,
                   pattern: VscRegex,
                   choice: IoMdList,
                   taxon: PestControlRodent,
                   ontology: VscTypeHierarchySub,
               }}/>;
