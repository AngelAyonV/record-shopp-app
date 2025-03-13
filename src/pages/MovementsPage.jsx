import React, { useContext, useEffect, useState } from 'react';
import { ShoppingContext } from '../ShoppingContext';
import { useNavigate } from 'react-router-dom';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import ExportPDF from '../components/ExportPDF';

const MovementsPage = () => {
  const { state, dispatch } = useContext(ShoppingContext);
  const navigate = useNavigate();

  // Log para verificar los datos
  useEffect(() => {
    console.log(state.movements);
  }, [state.movements]);

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

      <Row className="mb-3">
        <Col className="text-center">
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
        <Table striped bordered hover responsive="md">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Asunto</th>
              <th>Método de Pago</th>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.map((movement, index) => (
              <tr key={movement.id}>
                <td>{index + 1}</td>
                <td>{movement.asunto}</td>
                <td>{movement.metodoPago}</td>
                <td>{movement.categoria}</td>
                <td>${parseFloat(movement.monto || 0).toFixed(2)}</td>
                <td>{movement.fecha}</td>
                <td className="d-flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(movement)}
                  >
                    Editar
                  </Button>
                  <Button
                    className=""
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      dispatch({ type: 'REMOVE_SHOP', payload: movement.id })
                    }
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MovementsPage;
