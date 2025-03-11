import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const MyNavbar = () => {
  const location = useLocation(); // Detecta la ruta actual

  return (
    <Navbar style={{ backgroundColor: '#0a1931' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          💳 Mi Finanzas App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === '/'}>
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/addshop"
              active={location.pathname === '/addshop'}
            >
              Agregar Compra
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/movements"
              active={location.pathname === '/movements'}
            >
              Movimientos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/settings"
              active={location.pathname === '/settings'}
            >
              Configuracion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
