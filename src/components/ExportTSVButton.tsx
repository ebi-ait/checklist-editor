import {Download} from "@mui/icons-material";
import {Button, useDataProvider, useRecordContext} from "react-admin";

export const ExportTSVButton = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();

    if (!record) return null;

    const handleExport = async () => {
        const {data} = await dataProvider.getMany('fields', {ids: [], meta: {parentId: record.id}})
        const fieldIds = data.map(f => f.id) || [];
        const fieldUnits = data.map(f => f.units?.join(',')) || [];
        let tsvContent = `Checklist\t${record.id}\t${record.title}\n`; // Single row with headers
        tsvContent += fieldIds.join('\t')+"\n"; // Single row with headers
        tsvContent += '#units ' + fieldUnits.join('\t')+'\n'; // Single row with headers
        console.log(`tsv: ${tsvContent}`)
        const blob = new Blob([tsvContent], {type: "text/tsv"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Checklist_${record.name}_${Date.now()}.tsv`; // Naming based on checklist name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <Button onClick={handleExport} startIcon={<Download/>}>
            Export TSV
        </Button>
    );
};
