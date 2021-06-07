import React,{useState} from "react";
import { Navbar, Nav, Form, } from "react-bootstrap";
import { Link } from "react-router-dom";
const Navbarc = () => {

  const [loginstatus,setloginstatus]=useState(false)
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto d-flex">
          <div className="mr-4">
            <Link classname="" style={{color:"white"}} to="/">
              Register
            </Link>
          </div>
          <div>
            <Link to="/login" style={{color:"white"}}>Login </Link>
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default Navbarc;
