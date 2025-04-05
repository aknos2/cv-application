export function addRow(setRow, rows) {
    setRow([...rows, crypto.randomUUID()]);
}

export function deleteRow(setRow, rows, id) {
    setRow(rows.filter(degreeId => degreeId !== id));
}