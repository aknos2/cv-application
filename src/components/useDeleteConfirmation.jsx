import { useState } from 'react';

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
