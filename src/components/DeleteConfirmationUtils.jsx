import Button from "./Button";

export function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div
      className="delete-confirmation-background"
      role="dialog"
      aria-modal="true"
    >
      <div className="delete-confirmation-container">
        <div className="delete-confirmation-content">
          <p>Are you sure you want to delete this entry?</p>
        </div>

        <div className="delete-confirmation-btn-container">
          <Button
            onClick={onCancel}
            text="Cancel"
            className="cancel-btn"
            ariaLabel="Cancel"
            tabIndex={0}
            type="button"
          />
          <Button
            onClick={onConfirm}
            text="Delete"
            className="confirm-delete-btn"
            ariaLabel="Confirm delete"
            tabIndex={0}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
