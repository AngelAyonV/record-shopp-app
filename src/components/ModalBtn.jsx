import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalBtn = ({ show, handleClose, handleEdit, handleDelete }) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Opciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* Columna 1: Botón Editar */}
            <div className="col-6">
              <Button
                variant="primary"
                size="sm" // 🔹 Hace el botón más pequeño
                className="w-100 px-2 py-1"
                onClick={() => {
                  handleEdit();
                  handleClose();
                }}
              >
                Editar
              </Button>
            </div>

            {/* Columna 2: Botón Eliminar */}
            <div className="col-6">
              <Button
                variant="danger"
                size="sm" // 🔹 Hace el botón más pequeño
                className="w-100 px-2 py-1"
                onClick={() => {
                  handleDelete();
                  handleClose();
                }}
              >
                Eliminar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalBtn;
