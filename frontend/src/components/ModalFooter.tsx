import React from 'react';
import Button from './Button';

interface ModalFooterProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  submitVariant?: 'primary' | 'danger';
  loading?: boolean;
  type?: 'button' | 'submit';
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  onCancel,
  onSubmit,
  submitLabel = 'Save Changes',
  cancelLabel = 'Cancel',
  submitVariant = 'primary',
  loading = false,
  type = 'submit',
}) => {
  return (
    <div className="flex gap-3 pt-2">
      <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
        {cancelLabel}
      </Button>
      <Button
        type={type}
        variant={submitVariant}
        loading={loading}
        onClick={onSubmit}
        className="flex-1"
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default ModalFooter;
