import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { motion } from "framer-motion"

const Navigation = ({ handleLogout }) => {

  const handleSelection = (e) => {
    console.log("Tweet");
  };

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" bg="dark" variant="dark">
      <Navbar.Brand href="/">DenkaTech</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="d-inline p-2 bg-dark text-white">
            Home
          </NavLink>
          <NavLink to="/todos" className="d-inline p-2 bg-dark text-white">Agenda</NavLink>
          <NavLink to="/todo-on-fire" className="d-inline p-2 bg-dark text-white">
            Todos On Fire
          </NavLink>
        </Nav>
        <Nav>
          {/* Calls the home/handleLogout function passed as prop */}
          <motion.Button className="button-ok" variant="success" onClick={handleLogout}
            animate={{ rotate: 360}}
            transition={{ duration: 1}}
            >
            Logout
          </motion.Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
