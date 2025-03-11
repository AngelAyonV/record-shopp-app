import React, { useContext } from 'react';
import { ShoppingContext } from '../ShoppingContext';

const MovementsPage = () => {
  const { state, dispatch } = useContext(ShoppingContext);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📋 Movimientos de Compras</h2>

      {state.movements.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay compras registradas.
        </div>
      ) : (
        <ul className="list-group">
          {state.movements.map((movement) => (
            <li
              key={movement.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                📌 <strong>{movement.asunto}</strong> <br />
                <span className="text-muted">
                  {movement.metodoPago} | {movement.categoria} | 💰{' '}
                  <strong>${movement.monto.toFixed(2)}</strong> | 📅{' '}
                  {movement.fecha}
                </span>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  dispatch({ type: 'REMOVE_SHOP', payload: movement.id })
                }
              >
                ❌ Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovementsPage;
