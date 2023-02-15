import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Container } from "react-bootstrap";

const Error = (props) => {
  const [show, setShow] = useState(props.flag);

  return (
    
  <div> <Toast.Body> {props.children}</Toast.Body></div>
 )
}

export default Error;