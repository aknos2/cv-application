export function addRow(setRow, rows) {
    const newId = crypto.randomUUID();
    setRow([...rows, {
        id: newId,
        degree: ""
    }]);
}

export function deleteRow(setRow, rows, id, e) {
    setRow(rows.filter(row => row.id !== id));
}
