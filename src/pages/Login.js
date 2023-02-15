import React, { useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import AuthContext from "../components/shared/AuthContext";
export const Login = () => {
  const email = useRef("");
  const password = useRef("");
  const { login } = useContext(AuthContext);

  const loginUser = async () => {
    let payload = {
      email: email.current.value,
      password: password.current.value,
    };
    await login(payload);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "500px", minWidth: "500px" }}
    >
      <Card
        className="shadow p-3 mb-5 rounded"
        style={{ backgroundColor: "lavenderblush", minWidth: "27vw" }}
      >
        <Card.Body>
          <Card.Title>Login</Card.Title>

          <Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={password}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="button" onClick={loginUser}>
                Submit
              </Button>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
