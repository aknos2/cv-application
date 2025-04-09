import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { addRow} from "./AddDeleteRows";
import { useFormSave } from "./useFormSave";
import { useDeleteConfirmation, DeleteConfirmation } from "./DeleteConfirmationUtils";

export default function DegreesSection({onSave, initialData}) {
    const [degreeRows, setDegreeRows] = useState(
        initialData || [{ degree: "" }]
    );

    useEffect(() => {
        if (initialData && initialData.length > 0) {
          setDegreeRows(initialData);
        }
      }, [initialData]);
    
    const {
        savedData,
        isEditing,
        showForm,
        handleSaveButton
    } = useFormSave(null);

    const { 
        showDeleteConfirm, 
        entryToDelete, 
        showDeleteConfirmation, 
        cancelDelete, 
        resetDeleteState 
      } = useDeleteConfirmation();

    const [isSaved, setIsSaved] = useState(false);

    const validateForm = () => {
        // Check if there's at least one non-empty degree
        const nonEmptyRows = degreeRows.filter(row => row.degree.trim() !== "");
        return nonEmptyRows.length > 0;
    };

    const onSaveClick = (e) => {
        e.preventDefault();
        // Filter out empty entries before saving
        const nonEmptyRows = degreeRows.filter(row => row.degree.trim() !== "");

        handleSaveButton(e, nonEmptyRows, nonEmptyRows);

        if (validateForm()) {
            // Call the onSave prop to update parent component
            onSave(degreeRows);
            setIsSaved(false);
        }

        if (!isEditing) {
            setDegreeRows(nonEmptyRows);
            setIsSaved(true);
        } 
    }

    const confirmDelete = (e) => {
        if (e) e.preventDefault();
        
        if (degreeRows.length > 1 && entryToDelete) {
            setDegreeRows(degreeRows.filter(row => row.id !== entryToDelete));
        }
        
        resetDeleteState();
    };

    const handleDeleteRow = (id, e) => {
        if (e) e.preventDefault();
        showDeleteConfirmation(id, e);
    };

    const handleInputChange = (e, id, field) => {
        setDegreeRows(prevRows => 
            prevRows.map(row => 
                row.id === id ? {...row, [field]: e.target.value} : row
            )
        );
    }
    
    if (!showForm && savedData) {
        return (
            <div className={`container ${isSaved ? "saved" : ""}`}>
                <h2>Degrees</h2>
                <div className="saved-data-container">
                    <h3>Saved Information</h3>
                    {Array.isArray(savedData) && savedData.map((entry) => (
                        <div key={entry.id} className="saved-info degrees-section">
                            <ul>
                                <li>{entry.degree}</li>
                            </ul>
                        </div>
                    ))}
                </div>
                <Button text="Edit" onClick={onSaveClick} aria-label="edit"/>
            </div>
        );
    }

    return (
        <div className={`container ${isSaved ? "saved" : ""}`}>
            <h2>Degrees</h2>

            {showDeleteConfirm && 
                <DeleteConfirmation 
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            }

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
                    <Button 
                        aria-label="delete" 
                        onClick={(e) => handleDeleteRow(entry.id, e)} 
                        text="x"
                        className="delete-btn"
                    />
                </div>
            ))}

            <div className="fill degrees">
                <label htmlFor="degrees-add">Degrees (if any applicable): </label>
                <Button type="button" className="degrees-add-btn" aria-label="add new degree" onClick={() => addRow(setDegreeRows, degreeRows)} text="+"/>
            </div>

            <Button onClick={onSaveClick} aria-label="save"/>
        </div>
    );
}