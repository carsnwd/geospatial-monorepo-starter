import { useState } from "react";

export interface UseModalConfig {
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useModal = ({ onConfirm, onCancel }: UseModalConfig) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    handleConfirm,
    handleCancel,
  };
};
