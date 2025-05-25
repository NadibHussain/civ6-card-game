import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function AlertMessage({ message, type, onClose }) {
  const [show, setShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Determine color scheme based on type
  const getVariant = () => {
    switch(type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  useEffect(() => {
    if (message) {
      setShow(true);
      setIsVisible(true);
      
      // Start fade out after 2.7 seconds (300ms before total 3s)
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
      }, 2700);
      
      // Close completely after 3 seconds
      const closeTimer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [message]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };
  console.log("AlertMessage:", { message, type, show });
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      keyboard={false}
      className={`alert-message-modal ${isVisible ? 'visible' : 'fade-out'}`}
    >
      <Modal.Header 
        className={`bg-${getVariant()} text-white border-0`}
        closeButton
        closeVariant="white"
      >
        <Modal.Title>
          {type === 'success' && 'Success!'}
          {type === 'error' && 'Error!'}
          {type === 'warning' && 'Warning!'}
          {type === 'info' && 'Info'}
          {!['success', 'error', 'warning', 'info'].includes(type) && 'Notification'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-4 text-center fs-5">
        {message}
      </Modal.Body>
    </Modal>
  );
}