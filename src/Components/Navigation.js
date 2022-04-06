import React from "react";

import { Nav, Navbar } from "react-bootstrap";
//Below we import the Link Component from a package called react-router-dom that connects the routing functionality in our app to the navigation we write. It's just a specialized Link!
//To install react-router-dom  (routing functionality), np,m install react-router-dom then import {Link} like below
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { currentUser, login, logout } = useAuth();
  return (
    <Navbar variant="dark" bg="dark" expand="md" className="p-3">
      <Navbar.Brand href="/">Todo App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
          <Link to="/todos" className="nav-link">
            Todos
          </Link>
          {currentUser ? (
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          ) : (
            <Nav.Link onClick={() => login()}>Login</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
