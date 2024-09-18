import {Create} from "react-admin";
import {ChecklistForm} from "./ChecklistEdit.tsx";

export const ChecklistCreate = props => (
    <Create {...props}>
        <ChecklistForm/>
    </Create>
);
