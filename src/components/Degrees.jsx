import { useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { addRow, deleteRow } from "./AddDeleteRows";
import { useFormSave } from "./useFormSave";

export default function DegreesSection() {
    const [degreeRows, setDegreeRows] = useState([{ degree: "" }]);
    
    const {
        savedData,
        isEditing,
        showForm,
        handleSaveButton
    } = useFormSave(null);

    const onSaveClick = (e) => {
        // Filter out empty entries before saving
        const nonEmptyRows = degreeRows.filter(row => row.degree.trim() !== "");

        handleSaveButton(e, nonEmptyRows, nonEmptyRows);

        if (!isEditing) {
            setDegreeRows(nonEmptyRows);
        } 
    }

    const handleInputChange = (e, id, field) => {
        setDegreeRows(prevRows => 
            prevRows.map(row => 
                row.id === id ? {...row, [field]: e.target.value} : row
            )
        );
    }

    if (!showForm && savedData) {
        return (
            <div className="container">
                <h2>Degrees</h2>
                {Array.isArray(savedData) && savedData.map((entry) => (
                    <div key={entry.id} className="saved-info degrees-section">
                        <ul>
                            <li>{entry.degree}</li>
                        </ul>
                    </div>
                ))}
                <Button text="Edit" onClick={onSaveClick} aria-label="edit"/>
            </div>
        );
    }

    return (
        <div className="container">
            <h2>Degrees</h2>

            {degreeRows.map((entry) => (
                <div key={entry.id} className="fill degrees">
                    <CustomInput
                        label="Degree:"
                        type="text"
                        id={`degrees-${entry.id}`}
                        name={`degrees-${entry.id}`}
                        aria-required="false"
                        value={entry.degree}
                        onChange={(e) => handleInputChange(e, entry.id, "degree")}
                    />
                    <Button aria-label="delete" onClick={() => deleteRow(setDegreeRows, degreeRows, entry.id)} text="x"/>
                </div>
            ))}

            <div className="fill degrees">
                <label htmlFor="degrees-add">Degrees (if any applicable): </label>
                <Button type="button" className="add-btn" onClick={() => addRow(setDegreeRows, degreeRows)} aria-label="add more" text="+"/>
            </div>

            <Button onClick={onSaveClick} aria-label="save"/>
        </div>
    );
}