import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

function ConfirmDialog({ title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel} size="sm">
      <div className="confirm-body">
        <span className="confirm-icon" aria-hidden="true">
          <AlertTriangle size={20} />
        </span>
        <p>{message}</p>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel} autoFocus>
          Cancel
        </button>
        <button type="button" className="btn btn--danger" onClick={onConfirm}>
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmDialog;
