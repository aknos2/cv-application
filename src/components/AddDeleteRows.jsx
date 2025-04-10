import { generateRandomId } from "./generateRandomId";

export function addRow(setRow, rows, newItemTemplate) {
    const newId = generateRandomId();
    setRow([...rows, {
        id: newId,
        ...newItemTemplate
    }]);
}

export function deleteRow(e, setRow, rows, id) {
    e.preventDefault();
    setRow(rows.filter(row => row.id !== id));
}
