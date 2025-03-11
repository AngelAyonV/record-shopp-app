import React from 'react';
import MyNavbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddShopp from './pages/AddShopp';
import MovementsPage from './pages/MovementsPage';
import Settings from './pages/Settings';
import { ShoppingProvider } from './ShoppingContext';

const RecordShoppApp = () => {
  return (
    <ShoppingProvider>
      <Router>
        <MyNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addshop" element={<AddShopp />} />
            <Route path="/movements" element={<MovementsPage />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </ShoppingProvider>
  );
};

export default RecordShoppApp;
