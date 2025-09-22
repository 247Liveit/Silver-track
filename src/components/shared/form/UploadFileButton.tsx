import * as React from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { Button, ButtonProps } from '../../ui/button';

export interface FileUploadButtonProps extends Omit<ButtonProps, 'onChange'> {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number; // in bytes
  validationRules?: {
    maxSize?: number;
    acceptedTypes?: string[];
    customValidation?: (file: File) => boolean | string;
  };
  showPreview?: boolean;
  previewClassName?: string;
  children?: React.ReactNode;
}

const FileUploadButton = React.forwardRef<HTMLButtonElement, FileUploadButtonProps>(
  ({
    onFileSelect,
    accept = '*/*',
    validationRules = {
      maxSize: 5 * 1024 * 1024, // 5MB default
      acceptedTypes: undefined,
    },

    children,
    ...buttonProps
  }, ref) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const validateFile = (file: File): boolean => {
      // Size validation
      if (validationRules.maxSize && file.size > validationRules.maxSize) {
        const sizeMB = validationRules.maxSize / (1024 * 1024);
        toast.error(`File size should be less than ${sizeMB}MB`);
        return false;
      }
      // Type validation
      if (validationRules.acceptedTypes && validationRules.acceptedTypes.length > 0) {
        if (!validationRules.acceptedTypes.includes(file.type)) {
          toast.error(`Please select a valid file type: ${validationRules.acceptedTypes.join(', ')}`);
          return false;
        }
      }

      // Custom validation
      if (validationRules.customValidation) {
        const customValidationResult = validationRules.customValidation(file);
        if (typeof customValidationResult === 'string') {
          toast.error(customValidationResult);
          return false;
        }
        if (!customValidationResult) {
          toast.error('File validation failed');
          return false;
        }
      }

      return true;
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (validateFile(file)) {
        onFileSelect?.(file);
        toast.success('File selected successfully');
      }

      // Reset the input
      event.target.value = '';
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      fileInputRef.current?.click();
      buttonProps.onClick?.(event);
    };



    return (
      <div className="flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <Button {...buttonProps} onClick={handleClick} ref={ref}>
          {children}
        </Button>

      </div>
    );
  }
);

FileUploadButton.displayName = 'FileUploadButton';

export { FileUploadButton };