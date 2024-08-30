// src/components/Header.js
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Mon Projet</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/patrimoine">
          <Nav.Link>Patrimoine</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/possessions">
          <Nav.Link>Possessions</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
