import { useState } from 'react';
import Button from './Button';

export function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="delete-confirmation-background">
        <div className='delete-confirmation-container'>
            <div className="delete-confirmation-content">
                <p>Are you sure you want to delete this entry?</p>
             </div>

            <div className="delete-confirmation-btn-container">
              <Button onClick={onCancel} text="Cancel" className="cancel-btn" ariaLabel="Cancel" />
              <Button onClick={onConfirm} text="Delete" className="confirm-delete-btn" ariaLabel="Confirm delete" />
            </div>
        </div>
    </div>
  );
}


export function useDeleteConfirmation() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const showDeleteConfirmation = (id, e) => {
    if (e) e.preventDefault();
    setEntryToDelete(id);
    setShowDeleteConfirm(true);
  };

  const cancelDelete = (e) => {
    if (e) e.preventDefault();
    setShowDeleteConfirm(false);
    setEntryToDelete(null);
  };

  return {
    showDeleteConfirm,
    entryToDelete,
    showDeleteConfirmation,
    cancelDelete,
    resetDeleteState: () => {
      setShowDeleteConfirm(false);
      setEntryToDelete(null);
    }
  };
}