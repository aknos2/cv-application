export function addRow(setRow, rows, newItemTemplate) {
    const newId = crypto.randomUUID();
    setRow([...rows, {
        id: newId,
        ...newItemTemplate
    }]);
}

export function deleteRow(e, setRow, rows, id) {
    e.preventDefault();
    setRow(rows.filter(row => row.id !== id));
}
