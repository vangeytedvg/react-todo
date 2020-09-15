import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import "../components/pages/home.css";

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
          <NavLink to="/todos" className="d-inline p-2 bg-dark text-white">
            Tools
          </NavLink>
        </Nav>
        <Nav>
          {/* Calls the home/handleLogout function passed a prop */}
          <Button className="button-ok" variant="success" onClick={handleLogout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
