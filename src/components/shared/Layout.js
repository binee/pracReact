import React, {useContext} from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import  AuthContext  from './AuthContext';
const Layout = (props) => {
  const { user } = useContext(AuthContext);
  return (
    <>   
     <Navbar bg="primary" variant='dark'>
        <Navbar.Brand as={Link} to="/">Product</Navbar.Brand>
        {user && <><Navbar.Brand href="/cars">Cars</Navbar.Brand>
        <Navbar.Brand href="/car/add">Add Car</Navbar.Brand>
        <Navbar.Brand href="/user">User</Navbar.Brand>
        <Navbar.Brand href="/user/adduser"> Add User</Navbar.Brand></>}
        <Nav className="ms-auto">
        {!user && <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>}
</Nav>
  
  </Navbar>
  <Container>{props.children}</Container>
</>
  )
}

export default Layout