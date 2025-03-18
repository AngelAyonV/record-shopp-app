import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ShoppingContext } from "../ShoppingContext";
import { useNavigate } from "react-router-dom";
import { FaDollarSign, FaCalendarAlt, FaTag } from "react-icons/fa";
import { Button, Form, Card, Row, Col, InputGroup, Toast } from "react-bootstrap";

const AddShopp = () => {
  const { state, dispatch } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    asunto: "",
    metodoPago: state.payMethods[0] || "TDC NU",
    categoria: state.categories[0] || "Supermercado",
    monto: "",
    fecha: new Date().toISOString().split("T")[0],
  });

  const [showToast, setShowToast] = useState(false);
  const [validated, setValidated] = useState(false);

  // Cargar datos si hay un movimiento en edición
  useEffect(() => {
    if (state.selectedMovement) {
      setShop(state.selectedMovement);
    }
  }, [state.selectedMovement]);

  const handleChange = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones antes de enviar
    if (!shop.asunto.trim() || isNaN(shop.monto) || parseFloat(shop.monto) <= 0) {
      setValidated(true);
      return;
    }

    if (shop.id) {
      // Editar compra existente
      dispatch({
        type: "UPDATE_SHOP",
        payload: { ...shop, monto: parseFloat(shop.monto) },
      });
    } else {
      // Nueva compra
      dispatch({
        type: "ADD_SHOP",
        payload: { ...shop, id: uuidv4(), monto: parseFloat(shop.monto) },
      });
    }

    setShowToast(true);

    // Reiniciar formulario
    setShop({
      asunto: "",
      metodoPago: state.payMethods[0] || "TDC NU",
      categoria: state.categories[0] || "Supermercado",
      monto: "",
      fecha: new Date().toISOString().split("T")[0],
    });

    setValidated(false);

    // Redirigir a movimientos
    setTimeout(() => navigate("/movements"), 2000);
  };

  const handleReset = () => {
    setShop({
      asunto: "",
      metodoPago: state.payMethods[0] || "TDC NU",
      categoria: state.categories[0] || "Supermercado",
      monto: "",
      fecha: new Date().toISOString().split("T")[0],
    });
    setValidated(false);
  };

  return (
    <div className="container mt-4">
      <Card className="shadow p-3 p-md-4">
        <h2 className="text-center mb-3">{shop.id ? "Editar Compra" : "Registrar Compra"}</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            {/* Asunto */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Asunto:</Form.Label>
                <Form.Control
                  type="text"
                  name="asunto"
                  placeholder="Ej: Compra de alimentos..."
                  value={shop.asunto}
                  onChange={handleChange}
                  required
                  isInvalid={validated && !shop.asunto.trim()}
                />
                <Form.Control.Feedback type="invalid">El asunto es obligatorio.</Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Método de Pago */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Método de Pago:</Form.Label>
                <Form.Select name="metodoPago" value={shop.metodoPago} onChange={handleChange}>
                  {state.payMethods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            {/* Categoría */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Categoría:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaTag />
                  </InputGroup.Text>
                  <Form.Select name="categoria" value={shop.categoria} onChange={handleChange}>
                    {state.categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Monto */}
            <Col md={6}>
              <Form.Group>
                <Form.Label>Monto de la compra:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaDollarSign />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="monto"
                    placeholder="Ej: 250.00"
                    value={shop.monto}
                    onChange={handleChange}
                    step="0.01"
                    required
                    isInvalid={validated && (!shop.monto || parseFloat(shop.monto) <= 0)}
                  />
                  <Form.Control.Feedback type="invalid">Monto debe ser mayor a 0.</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Fecha */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha:</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control type="date" name="fecha" value={shop.fecha} onChange={handleChange} />
            </InputGroup>
          </Form.Group>

          {/* Botones */}
          <div className="d-flex justify-content-between">
            <Button variant="secondary" onClick={handleReset} className="px-3">
              Limpiar
            </Button>
            <Button type="submit" variant="primary" className="px-4">
              {shop.id ? "Actualizar Compra" : "Agregar Compra"}
            </Button>
          </div>
        </Form>
      </Card>

      {/* Notificación Toast */}
      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 5 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
          <Toast.Body className="text-success fw-bold">
            ✅ {shop.id ? "Compra actualizada correctamente." : "Compra agregada correctamente."}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default AddShopp;
