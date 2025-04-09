import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { useFormSave } from "./useFormSave";
import { addRow } from "./AddDeleteRows";
import { DeleteConfirmation, useDeleteConfirmation } from "./DeleteConfirmationUtils";

export default function WorkSection({onSave, initialData}) {
    const [workEntries, setWorkEntries] = useState(
        initialData || [
        {
            id: crypto.randomUUID(),
            companyName: "",
            positionTitle: "",
            dateFrom: "",
            dateTo: "",
            duties: ""
        }
    ])

    useEffect(() => {
        if (initialData && initialData.length > 0) {
          setWorkEntries(initialData);
        }
      }, [initialData]);

    const [errors, setErrors] = useState({});

    const {
        showDeleteConfirm,
        entryToDelete,
        showDeleteConfirmation,
        cancelDelete,
        resetDeleteState
    } = useDeleteConfirmation();

    const validateCompanyName = (companyName) => {
        const companyNameRegex = /^[A-Za-z0-9&.,''()\-\s]{2,100}$/;
        return companyNameRegex.test(companyName);
    }

    const validatePositionTitle = (positionTitle) => {
        const positionTitleRegex = /^[A-Za-z0-9&.'\-()\s]{2,100}$/;
        return positionTitleRegex.test(positionTitle);
    }

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        workEntries.forEach(entry => {
            newErrors[entry.id] = {
                companyName: "",
                positionTitle: "",
                dateFrom: undefined,
                dateTo: undefined,
                duties: ""
            }

            if (!entry.companyName) {
                newErrors[entry.id].companyName = "Company name is required";
                isValid = false;
            } else if (!validateCompanyName(entry.companyName)) {
                newErrors[entry.id].companyName = "Please enter a valid company name";
                isValid = false;
            }

            if (!entry.positionTitle) {
                newErrors[entry.id].positionTitle = "Position is required";
                isValid = false;
            } else if (!validatePositionTitle(entry.positionTitle)) {
                newErrors[entry.id].positionTitle = "Please enter a valid position";
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

            if (!entry.duties) {
                newErrors[entry.id].duties = "Description is required";
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

    const [isSaved, setIsSaved] = useState(false);

    
    const onSaveClick = (e) => {       
        e.preventDefault();
        handleSaveButton(e, workEntries);

        if (validateForm()) {
            // Call the onSave prop to update parent component
            onSave(workEntries);
            setIsSaved(true);
          }
        
        // If we're switching from edit mode to view mode, load saved data
        if (isEditing && savedData) {
            setWorkEntries(savedData);
            setIsSaved(false);
        }
    };

    const handleInputChange = (e, id, field) => {
        setWorkEntries(prevEntries => 
            prevEntries.map(entry => 
                entry.id === id ? { ...entry, [field]: e.target.value } : entry
            )
        );
    };
    
    const handleAddWork = (e) => {
        e.preventDefault();
        addRow(setWorkEntries, workEntries, {
            companyName: "",
            positionTitle: "",
            dateFrom: "",
            dateTo: "",
            duties: ""
        });
    };

    const handleDeleteRow = (id, e) => {
        showDeleteConfirmation(id, e);
    }

    const confirmDelete = (e) => {
        if (e) {
            e.preventDefault();
        }

        if ( workEntries.length > 1 && entryToDelete) {
            setWorkEntries(workEntries.filter(entry => entry.id !== entryToDelete))
        }

        resetDeleteState();
    }

    if (!showForm && savedData) {
        return (
            <form className={`container ${isSaved ? 'saved' : ''}`}>
                <h2>Work Experience</h2>
                <div className="saved-data-container">
                    <h3>Saved Information</h3>
                    {Array.isArray(savedData) && savedData.map((entry) => (
                        <div key={entry.id} className="saved-info work-section">
                            <div className="company-position-wrap">
                                <p><span className='highlight-word'>Company Name</span>: {entry.companyName}</p>
                                <p><span className='highlight-word'>Position</span>: {entry.positionTitle}</p>
                            </div>
                            <div className="from-to-wrap">
                                <p><span className='highlight-word'>From</span>: {entry.dateFrom}</p>
                                <p><span className='highlight-word'>To</span>: {entry.dateTo}</p>
                            </div>
                            <div className="saved-duties-wrap">
                                <p><span className='highlight-word'>Main duties performed</span>: </p>
                                <p>{entry.duties}</p>
                            </div>
                            <hr />
                        </div>
                    ))}
                    <Button onClick={onSaveClick} text="Edit" className="save-btn"/>
                </div>
            </form>
        )
    }

    return (
        <form className="container" onSubmit={(e) => e.preventDefault()}>
            <h2>Work Experience</h2>

            {showDeleteConfirm && 
                <DeleteConfirmation 
                     onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            }

            {workEntries.map((entry) => (
                <div key={entry.id} className="work-row">
                    <div className="fill company-name">
                        <CustomInput
                            label="Company Name:"
                            type="text"
                            id={`company-name-${entry.id}`}
                            name={`company-name-${entry.id}`}
                            value={entry.companyName}
                            onChange={(e) => handleInputChange(e, entry.id, "companyName")}
                            showError={showErrors}
                            error={errors[entry.id]?.companyName || ""}
                        />
                    </div>

                    <div className="fill position-title">
                        <CustomInput
                            label="Position:"
                            type="text"
                            id={`position-title-${entry.id}`}
                            name={`position-title-${entry.id}`}
                            value={entry.positionTitle}
                            onChange={(e) => handleInputChange(e, entry.id, "positionTitle")}
                            showError={showErrors}
                            error={errors[entry.id]?.positionTitle || ""}
                        />
                    </div>

                    <div className="fill work-date">
                        <CustomInput
                            label="From:"
                            type="date"
                            id={`date-from-${entry.id}`}
                            name={`date-from-${entry.id}`}
                            value={entry.dateFrom}
                            onChange={(e) => handleInputChange(e, entry.id, "dateFrom")}
                            showError={showErrors}
                            error={errors[entry.id]?.dateFrom || ""}
                        />
                        <CustomInput
                            label="To:"
                            type="date"
                            id={`date-to-${entry.id}`}
                            name={`date-to-${entry.id}`}
                            value={entry.dateTo}
                            onChange={(e) => handleInputChange(e, entry.id, "dateTo")}
                            showError={showErrors}
                            error={errors[entry.id]?.dateTo || ""}
                        />
                    </div>

                    <div className="fill duties">
                        <label htmlFor={`duties-${entry.id}`}>Main duties performed:</label>
                        <textarea
                            name={`duties-${entry.id}`}
                            id={`duties-${entry.id}`}
                            value={entry.duties}
                            onChange={(e) => handleInputChange(e, entry.id, "duties")}
                        />
                    </div>

                    {showErrors && errors[entry.id]?.duties && (
                        <span className="error-message">{errors[entry.id].duties}</span>
                    )}

                    {workEntries.length > 1 && (
                        <Button 
                         text="Delete"
                         id={`delete-btn-${entry.id}`} 
                         onClick={(e) => handleDeleteRow(entry.id, e)}
                         className="delete-btn"
                        />
                    )}
                </div>
            ))}
                
            <div className="button-group">
                <Button text="+" className="add-btn" aria-label="add new work experience" onClick={handleAddWork} />
                <div className="center-save-button">
                    <Button onClick={onSaveClick} ariaLabel="save" className="save-btn" text={isEditing ? "Edit" : "Save"} />
                </div>
            </div>
        </form>
    );
}