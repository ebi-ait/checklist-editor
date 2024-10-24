import { Button, useNotify, useRedirect, useRecordContext, useMutation } from "react-admin";
import ContentCopyIcon from '@mui/icons-material/ContentCopy'; // Icon for the button
import { useCallback } from 'react';

const DuplicateButton = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const record = useRecordContext();  // Gets the current record
    const [duplicate, { isLoading }] = useMutation();  // Mutation hook to handle API call

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
                    redirect('edit', 'yourResource', data.id);  // Redirect to the edit page for the new record
                },
                onError: (error) => {
                    notify(`Error: ${error.message}`, { type: 'warning' });
                },
            }
        );
    }, [duplicate, record, notify, redirect]);

    return ("hello"
    );
};

export default DuplicateButton;
