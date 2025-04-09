import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { useFormSave } from "./useFormSave";
import { DeleteConfirmation, useDeleteConfirmation } from "./DeleteConfirmationUtils";


export default function EducationSection({onSave, initialData}) {
    // State for the form fields
    const [educationEntries, setEducationEntries] = useState(
        initialData || [
        {
            id: crypto.randomUUID(),
            schoolName: "",
            studyField: "",
            dateFrom: "",
            dateTo: ""
        }
    ]);

    useEffect(() => {
        if (initialData && initialData.length > 0) {
          setEducationEntries(initialData);
        }
      }, [initialData]);
    
    // Error states for each entry
    const [errors, setErrors] = useState({});

    const { 
        showDeleteConfirm, 
        entryToDelete, 
        showDeleteConfirmation, 
        cancelDelete, 
        resetDeleteState 
      } = useDeleteConfirmation();

    const [isSaved, setIsSaved] = useState(false);
 
    const validateSchoolName = (schoolName) => {
        const schoolNameRegex = /^[A-Za-z\s'.-]{2,100}$/;
        return schoolNameRegex.test(schoolName);
    }

    const validateStudyField = (studyField) => {
        const studyFieldRegex = /^[A-Za-z0-9&.'\-()\s]{2,100}$/;
        return studyFieldRegex.test(studyField);
    }

    const validateForm = () => {
        const newErrors = {};
        //isValid from useFormSave.jsx
        let isValid = true;

        educationEntries.forEach((entry) => {
            newErrors[entry.id] = {
                schoolName: "",
                studyField: "",
                dateFrom: undefined,
                dateTo: undefined
            };

            if (!entry.schoolName) {
                newErrors[entry.id].schoolName = "School name is required";
                isValid = false;
            } else if (!validateSchoolName(entry.schoolName)) {
                newErrors[entry.id].schoolName = "Please enter a valid school name";
                isValid = false;
            }

            if (!entry.studyField) {
                newErrors[entry.id].studyField = "Study field is required";
                isValid = false;
            } else if (!validateStudyField(entry.studyField)) {
                newErrors[entry.id].studyField = "Please enter a valid study field";
                isValid = false;
            }

            if (!entry.dateTo || !entry.dateFrom) {
                newErrors[entry.id].dateTo = "Dates required";
                newErrors[entry.id].dateFrom = true;
                isValid = false;
            } else if (entry.dateFrom > entry.dateTo) {
                newErrors[entry.id].dateTo = "Dates should be in chronological order";
                newErrors[entry.id].dateFrom = true;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }

    const {
        savedData,
        isEditing,
        showForm,
        showErrors,
        handleSaveButton
    } = useFormSave(null, validateForm);
    
    const onSaveClick = (e) => {       
        if (validateForm()) {
            // Call the onSave prop to update parent component
            onSave(educationEntries);

            setIsSaved(true);
          }
        
        handleSaveButton(e, educationEntries);

        // If we're switching from edit mode to view mode, load saved data
        if (isEditing && savedData) {
            setEducationEntries(savedData);
            setIsSaved(false)
        }
    };

    const handleInputChange = (e, id, field) => {
        setEducationEntries(prevEntries => 
            prevEntries.map(entry => 
                entry.id === id ? { ...entry, [field]: e.target.value } : entry
            )
        );
    };

    const addRow = (e) => {
        e.preventDefault();

        const newEntry = {
            id: crypto.randomUUID(),
            schoolName: "",
            studyField: "",
            dateFrom: "",
            dateTo: ""
        };
        setEducationEntries([...educationEntries, newEntry]);
    };

    const deleteRow = (id, e) => {
        showDeleteConfirmation(id, e);
    };

    const confirmDelete = (e) => {
        if (e) {
            e.preventDefault(); 
        }

        if (educationEntries.length > 1 && entryToDelete) {
            setEducationEntries(educationEntries.filter(entry => entry.id !== entryToDelete));
        }

        resetDeleteState();
    }

    // If we're viewing saved data and we have data to show
    if (!showForm && savedData) {
        return (
            <form className={`container ${isSaved ? 'saved' : ''}`}>
                <h2>Education</h2>
                <div className="saved-data-container">
                    <h3>Saved Information</h3>
                    {Array.isArray(savedData) && savedData.map((entry) => (
                        <div key={entry.id} className="saved-info education-section">
                            <div>
                                <p><span className='highlight-word'>School Name</span>: {entry.schoolName}</p>
                                <p><span className='highlight-word'>Field</span>: {entry.studyField}</p>
                            </div>
                            <div>
                                <p><span className='highlight-word'>From</span>: {entry.dateFrom}</p>
                                <p><span className='highlight-word'>To</span>: {entry.dateTo}</p>
                            </div>
                        </div>
                    ))}
                    <Button onClick={onSaveClick} text="Edit" className="save-btn"/>
                </div>
            </form>
        );
    }

    // Otherwise, show the form
    return (
        <form className="container" onSubmit={(e) => e.preventDefault()}>
            <h2>Education</h2>

            {/* Delete confirmation dialog */}
            {showDeleteConfirm && 
                <DeleteConfirmation 
                    onConfirm={confirmDelete} 
                    onCancel={cancelDelete} 
                />
            }

            {educationEntries.map((entry) => (
                <div key={entry.id} className="education-row">
                    <div className="fill school-name">
                        <CustomInput
                            label="School Name:"
                            id={`school-name-${entry.id}`}
                            name={`school-name-${entry.id}`}
                            value={entry.schoolName}
                            onChange={(e) => handleInputChange(e, entry.id, "schoolName")}
                            error={errors[entry.id]?.schoolName || ""}
                            showError={showErrors}
                            required
                        />
                    </div>
        
                    <div className="fill study-field">
                        <CustomInput
                            label="Field:"
                            id={`study-field-${entry.id}`}
                            name={`study-field-${entry.id}`}
                            value={entry.studyField}
                            onChange={(e) => handleInputChange(e, entry.id, "studyField")}
                            error={errors[entry.id]?.studyField || ""}
                            showError={showErrors}
                            required
                        />
                    </div>
        
                    <div className="fill study-date">
                        <CustomInput
                            label="From:"
                            type="month"
                            id={`date-from-${entry.id}`}
                            name={`date-from-${entry.id}`}
                            value={entry.dateFrom}
                            onChange={(e) => handleInputChange(e, entry.id, "dateFrom")}
                            error={errors[entry.id]?.dateFrom || ""}
                            showError={showErrors}
                            required
                        />
                        <CustomInput
                            label="To:"
                            type="month"
                            id={`date-to-${entry.id}`}
                            name={`date-to-${entry.id}`}
                            value={entry.dateTo}
                            onChange={(e) => handleInputChange(e, entry.id, "dateTo")}
                            error={errors[entry.id]?.dateTo || ""}
                            showError={showErrors}
                            required
                        />
                    </div>
                    
                    {educationEntries.length > 1 && (
                        <Button 
                            text="Delete" 
                            id={`delete-btn-${entry.id}`} 
                            onClick={(e) => deleteRow(entry.id, e)}
                            className="delete-btn"
                        />
                    )}
                </div>
            ))}
            
            <div className="button-group">
                <Button text="+" className="add-btn" onClick={addRow} />
                <div className="center-save-button">
                    <Button onClick={onSaveClick} className="save-btn" text={isEditing ? "Edit" : "Save"} />
                </div>
            </div>
        </form>
    );
}