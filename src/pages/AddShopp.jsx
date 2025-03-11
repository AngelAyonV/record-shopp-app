import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ShoppingContext } from '../ShoppingContext';
import { useNavigate } from 'react-router-dom'; // 🆕 Para redirigir después de guardar

const AddShopp = () => {
  const { state, dispatch } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const [shop, setShop] = useState({
    asunto: '',
    metodoPago: 'TDC NU',
    categoria: 'Supermercado',
    monto: '',
    fecha: new Date().toISOString().split('T')[0],
  });

  // Si hay un movimiento en edición, cargarlo en el formulario
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

    if (!shop.asunto.trim()) {
      alert('El asunto no puede estar vacío.');
      return;
    }
    if (!shop.monto || isNaN(shop.monto) || parseFloat(shop.monto) <= 0) {
      alert('Ingresa un monto válido mayor a 0.');
      return;
    }

    dispatch({
      type: 'ADD_SHOP',
      payload: { id: uuidv4(), ...shop, monto: parseFloat(shop.monto) },
    });

    alert('Compra registrada correctamente.');

    setShop({
      asunto: '',
      metodoPago: 'TDC NU',
      categoria: 'Supermercado',
      monto: '',
      fecha: new Date().toISOString().split('T')[0],
    });
    navigate('/movements');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Registrar Compra</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Asunto:</label>
            <input
              type="text"
              name="asunto"
              className="form-control"
              value={shop.asunto}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Método de Pago:</label>
            <select
              name="metodoPago"
              className="form-select"
              value={shop.metodoPago}
              onChange={handleChange}
            >
              <option value="TDC NU">TDC NU</option>
              <option value="TDC ML">TDC ML</option>
              <option value="TDC BBVA">TDC BBVA</option>
              <option value="Débito BANCOPPEL">Débito BANCOPPEL</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría:</label>
            <select
              name="categoria"
              className="form-select"
              value={shop.categoria}
              onChange={handleChange}
            >
              <option value="Supermercado">Supermercado</option>
              <option value="Farmacia">Farmacia</option>
              <option value="Viajes">Viajes</option>
              <option value="Música">Música</option>
              <option value="Electrónica">Electrónica</option>
              <option value="Restaurant">Restaurant</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Monto ($$$):</label>
            <input
              type="number"
              name="monto"
              className="form-control"
              value={shop.monto}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha:</label>
            <input
              type="date"
              name="fecha"
              className="form-control"
              value={shop.fecha}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Agregar Compra
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddShopp;
