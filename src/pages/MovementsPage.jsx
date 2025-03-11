import React, { useContext, useEffect } from 'react';
import { ShoppingContext } from '../ShoppingContext';
import { useNavigate } from 'react-router-dom'; //  Para redirigir

const MovementsPage = () => {
  const { state, dispatch } = useContext(ShoppingContext);

  // console log solo para checar los datos
  useEffect(() => {
    console.log(state.movements);
  }, [state.movements]);

  /* //  Para redirigir a la página de edición */
  const navigate = useNavigate();

  const handleEdit = (movement) => {
    dispatch({ type: 'SET_EDIT_SHOP', payload: movement }); // 🆕 Guardar en el contexto
    navigate('/addshop'); // 🆕 Redirigir al formulario de agregar compra
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 Movimientos de Compras</h2>

      {state.movements.length === 0 ? (
        <div className="alert alert-secondary text-center py-4">
          <img
            src="https://img.icons8.com/color/48/nothing-found.png"
            alt="Sin compras"
            width="30"
            height="30"
            className="mb-3"
          />
          <p className="fs-5 fw-light">No hay compras registradas.</p>
        </div>
      ) : (
        <ul className="list-group">
          {state.movements.map((movement) => (
            <li
              key={movement.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{movement.asunto}</strong> <br />
                <span className="text-muted">
                  {movement.metodoPago} | {movement.categoria} | 💰{' '}
                  <strong>${parseFloat(movement.monto || 0).toFixed(2)}</strong>
                  {'  '}| 📅 {movement.fecha}
                </span>
              </div>
              <div className="d-flex justify-content-end mt-3">
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() =>
                    dispatch({ type: 'REMOVE_SHOP', payload: movement.id })
                  }
                >
                  ❌ Eliminar
                </button>
                <button
                  className="btn btn-primary btn-sm mx-0"
                  onClick={() => handleEdit(movement)}
                >
                  ✏️ Editar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovementsPage;
