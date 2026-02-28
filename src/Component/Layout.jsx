import React from 'react'
 import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
const Layout = () => {
  return (
    <div>
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Employee Management System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Dashboard" >Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/AllData"  href="#features">AllDetails</Nav.Link>
          <Nav.Link as={Link} to="/"  href="#features">Layout</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
       
        </div>
  )
}

export default Layout;