import React, { createContext, useReducer, useEffect } from 'react';

// Intentar cargar datos previos de LocalStorage
const initialState = {
  movements: JSON.parse(localStorage.getItem('movements')) || [],
};

// Definir las acciones del reducer
const shoppingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SHOP': {
      const updatedMovements = [...state.movements, action.payload];
      localStorage.setItem('movements', JSON.stringify(updatedMovements)); // Guardar en LocalStorage
      return { ...state, movements: updatedMovements };
    }

    case 'REMOVE_SHOP': {
      const filteredMovements = state.movements.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem('movements', JSON.stringify(filteredMovements)); // Guardar en LocalStorage
      return { ...state, movements: filteredMovements };
    }

    default:
      return state;
  }
};

// Crear el contexto
export const ShoppingContext = createContext();

// Proveedor del contexto
export const ShoppingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  // Cargar datos de LocalStorage cuando la app se monta
  useEffect(() => {
    const storedMovements = JSON.parse(localStorage.getItem('movements'));
    if (storedMovements) {
      dispatch({ type: 'LOAD_MOVEMENTS', payload: storedMovements });
    }
  }, []);

  return (
    <ShoppingContext.Provider value={{ state, dispatch }}>
      {children}
    </ShoppingContext.Provider>
  );
};
