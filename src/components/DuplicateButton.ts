import {Button, useCreate, useNotify, useRecordContext, useRedirect} from "react-admin";
import {useCallback} from "react";
import {useMutation} from "@tanstack/react-query";


const DuplicateButton = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const record = useRecordContext();  // Gets the current record
    const [duplicate, { isLoading }] = useCreate();  // Mutation hook to handle API call

    const handleClick = useCallback(() => {
        if (!record) return;  // Make sure the record exists

        // Remove any fields that shouldn't be duplicated (e.g., ID, timestamps, etc.)
        const { id, createdAt, updatedAt, ...newRecord } = record;  // Adjust as needed

        // Optionally, you can modify the duplicated data here
        newRecord.name = `${newRecord.name} (copy)`;  // Example: Append "(copy)" to the name

        // Send the duplicate data to the backend
        duplicate(
            {
                type: 'create',
                resource: 'checklists',  // Replace with your resource (e.g., 'posts', 'products')
                payload: { data: newRecord },
            },
            {
                onSuccess: ({ data }) => {
                    notify('Record duplicated successfully', { type: 'info' });
                    redirect('edit', 'checklists', data.id);  // Redirect to the edit page for the new record
                },
                onError: (error) => {
                    notify(`Error: ${error.message}`, { type: 'warning' });
                },
            }
        );
    }, [duplicate, record, notify, redirect]);

    return ("Duplicate Button"
        //todo why button not working below
//         <Button
//             label="Duplicate"
//     onClick={handleClick}
//     disabled={isLoading || !record}
// >
//     <ContentCopyIcon />  {/* Button icon */}
//     </Button>
);
};

export default DuplicateButton;
