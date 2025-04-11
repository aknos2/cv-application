import { useState } from "react";

export function useFormSave(initialData, validateFormFn) {
  const [savedData, setSavedData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showErrors, setShowErrors] = useState(false);

  const handleSaveButton = (e, formData, overrideSaveData = null) => {
    e.preventDefault();

    if (!isEditing) {
      setShowErrors(true);

      // Run the validation function passed to the hook
      const isValid = validateFormFn ? validateFormFn() : true;
      if (!isValid) return;

      // We're in "Save" mode - save the data and switch to view mode
      setSavedData(overrideSaveData ?? formData);
      setShowForm(false);
      setIsEditing(true);
    } else {
      // We're in "Edit" mode - switch back to form view with saved values
      setShowForm(true);
      setIsEditing(false);
    }
  };

  return {
    savedData,
    isEditing,
    showForm,
    showErrors,
    setShowErrors,
    handleSaveButton,
  };
}
