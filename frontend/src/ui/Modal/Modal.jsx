import React from "react";
import './Modal.css';
import useClickOutside from "../../hooks/useClickOutside";
import { useRef } from "react";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef()

  useClickOutside(modalRef, () => {
      onClose()
  })
  return (
    <div className="modal-overlay" onClick={onClose} ref={modalRef}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-onClose" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;