// File: components/admin/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import styles from '../../styles/admin/Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'medium',
  children
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key press to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Handle clicks outside of modal to close it
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div 
        className={`${styles.modalContainer} ${styles[size]}`} 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.modalHeader}>
          <h3 id="modal-title" className={styles.modalTitle}>{title}</h3>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>
        
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;