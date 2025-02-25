import {Create} from "react-admin";
import {FieldGroupForm} from "./FieldGroupEdit.tsx";

export const FieldGroupCreate = () =>
    (
        <Create>
            <FieldGroupForm/>
        </Create>
    );
