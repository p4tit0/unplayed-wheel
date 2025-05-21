import './AlertMessage.module.css';

interface AlertMessageProps {
  message: string | null;
  variant?: 'danger' | 'success' | 'warning';
  onClose?: () => void;
}

export default function AlertMessage({ message, variant = 'danger', onClose }: AlertMessageProps) {
  if (!message) return null;

  return (
    <div className={`alert-message ${variant} fade-in`}>
      {message}
      {onClose && (
        <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
          &times;
        </button>
      )}
    </div>
  );
}