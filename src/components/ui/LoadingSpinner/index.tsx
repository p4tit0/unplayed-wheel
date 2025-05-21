import { Spinner } from 'react-bootstrap';
import './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  size?: 'sm' | undefined;
  className?: string;
}

export default function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${className || ''}`}>
      <Spinner as="span" animation="border" size={size} role="status" aria-hidden="true" />
      <span className="ms-2">Loading...</span>
    </div>
  );
}