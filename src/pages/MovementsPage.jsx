import React, { useContext, useEffect, useState } from 'react';
import { ShoppingContext } from '../ShoppingContext';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Modal,
} from 'react-bootstrap';
import { FaEllipsisV } from 'react-icons/fa'; // Ícono de 3 puntos
import { FaCog } from 'react-icons/fa'; // Ícono de engranaje (opcional)

import ExportPDF from '../components/ExportPDF';
import ModalBtn from '../components/ModalBtn';

const MovementsPage = () => {
  const { state, dispatch } = useContext(ShoppingContext);
  const navigate = useNavigate();

  // modal
  const [selectedMovement, setSelectedMovement] = useState(null); // Estado para guardar el movimiento seleccionado
  const [showModal, setShowModal] = useState(false);
  const handleShow = (movement) => {
    setSelectedMovement(movement); // Guardamos el movimiento al abrir el modal
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
    setSelectedMovement(null); // Limpiamos el estado al cerrar
  };

  // Estados para los filtros
  const [filterMethod, setFilterMethod] = useState(''); // Método de pago
  const [filterCategory, setFilterCategory] = useState(''); // Categoría
  const [filterStartDate, setFilterStartDate] = useState(''); // Fecha inicial
  const [filterEndDate, setFilterEndDate] = useState(''); // Fecha final

  // Filtrar movimientos
  const filteredMovements = state.movements.filter((movement) => {
    const matchesMethod = filterMethod
      ? movement.metodoPago === filterMethod
      : true;
    const matchesCategory = filterCategory
      ? movement.categoria === filterCategory
      : true;

    const movementDate = new Date(movement.fecha);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const endDate = filterEndDate ? new Date(filterEndDate) : null;

    const matchesDate =
      (!startDate || movementDate >= startDate) &&
      (!endDate || movementDate <= endDate);

    return matchesMethod && matchesCategory && matchesDate;
  });

  // Limpiar filtros
  const clearFilters = () => {
    setFilterMethod('');
    setFilterCategory('');
    setFilterStartDate('');
    setFilterEndDate('');
  };

  // Redirigir a edición
  const handleEdit = (movement) => {
    dispatch({ type: 'SET_EDIT_SHOP', payload: movement });
    navigate('/addshop');
  };

  return (
    <Container>
      <h2 className="text-center my-4">Movimientos de Compras</h2>

      {/* FILTROS */}
      <Row className="mb-3 g-2">
        <Col md={3}>
          <Form.Select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
          >
            <option value="">Método de Pago (Todos)</option>
            {state.payMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Categoría (Todas)</option>
            {state.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Group controlId="filterStartDate">
            <div className="input-group">
              <Form.Control
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                className="form-control"
              />
            </div>
            <Form.Label className="my-2">Fecha Inicio</Form.Label>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="filterEndDate">
            <div className="input-group">
              <Form.Control
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                className="form-control"
              />
            </div>
            <Form.Label className="my-2">Fecha Final</Form.Label>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3 text-center">
        <Col>
          <Button variant="secondary" onClick={clearFilters}>
            Limpiar Filtros
          </Button>
        </Col>
        <Col>
          <ExportPDF movements={filteredMovements} />
        </Col>
      </Row>

      {/* TABLA RESPONSIVA */}
      {filteredMovements.length === 0 ? (
        <div className="alert alert-secondary text-center py-4">
          <img
            src="https://img.icons8.com/color/48/nothing-found.png"
            alt="Sin compras"
            width="30"
            height="30"
            className="mb-3"
          />
          <p className="fs-5 fw-light">
            No se encontraron compras con esos filtros.
          </p>
        </div>
      ) : (
        filteredMovements.map((movement) => (
          <Card key={movement.id} className="mb-2 shadow-sm">
            <Card.Body className="p-2">
              <div className="d-flex justify-content-between align-items-center mb-1">
                {/* Categoría */}
                <Card.Title
                  className="text-uppercase text-muted small text-truncate mb-0"
                  style={{ maxWidth: '80%' }} // 🔹 Asegura que el texto no ocupe todo el espacio
                >
                  {movement.categoria}
                </Card.Title>

                {/* Botón de configuración */}
                <Button
                  variant="light"
                  size="sm"
                  className="p-1"
                  onClick={() => handleShow(movement)}
                >
                  <FaEllipsisV size={18} />
                </Button>
              </div>

              {/* Asunto más destacado */}
              <Card.Subtitle className="fs-6 fw-bold">
                {movement.asunto}
              </Card.Subtitle>

              {/* Método de pago y precio */}
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between align-items-center py-1">
                  <span className="text-muted small">Método de Pago:</span>
                  <span className="fw-bold small">{movement.metodoPago}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between align-items-center py-1">
                  <span className="text-muted small">Fecha:</span>
                  <span className="small">{movement.fecha}</span>
                </ListGroup.Item>

                <ListGroup.Item className="d-flex justify-content-between align-items-center py-1">
                  <span className="text-muted small">Monto:</span>
                  <span className="fs-6 fw-bold text-success">
                    ${parseFloat(movement.monto || 0).toFixed(2)}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
      {/* MODAL (Importado desde otro componente) */}
      <ModalBtn
        show={showModal}
        handleClose={handleClose}
        handleEdit={() => handleEdit(selectedMovement)}
        handleDelete={() =>
          dispatch({ type: 'REMOVE_SHOP', payload: selectedMovement.id })
        }
      />
    </Container>
  );
};

export default MovementsPage;
