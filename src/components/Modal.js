import React, { useState, useRef, useEffect } from "react";
import { MdOutlineClose } from "react-icons/md";

const bodyElement = document.querySelector("body");

export default function Modal({ isOpen, onModalClose, children }) {
  const modalRef = useRef();
  const modalCloseBtnRef = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.showModal();
      bodyElement.style = "overflow: hidden;";
      // bodyElement.style = "position: fixed;";
    } else {
      bodyElement.style = "";
      modalRef.current.close();
    }
  }, [isOpen]);

  function closeModal(e) {
    if (
      e.target === e.currentTarget ||
      e.currentTarget === modalCloseBtnRef.current
    ) {
      onModalClose();
    }
  }

  return (
    <dialog
      className="modal"
      id="modalDialog"
      onClick={closeModal}
      ref={modalRef}
    >
      <div className="modal_container">
        <div
          className="modal_close_btn"
          ref={modalCloseBtnRef}
          onClick={closeModal}
        >
          <MdOutlineClose className="react-icon s" />
        </div>
        {children}
      </div>
    </dialog>
  );
}
