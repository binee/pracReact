import React, {useState, Suspense} from "react";
import {ErrorBoundary} from 'react-error-boundary';
import Error from '../../components/shared/Error';
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, getLoading, getUserId, getError } from "../../redux/user/userslice";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const AddUser = () => {
  const loading = useSelector(getLoading);
  const err = useSelector(getError);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const updateFlag = id ? true : false;
  const userEditInfo = useSelector(getUserId(id))[0];
  const { control, handleSubmit  } = useForm({
    defaultValues: {
      firstName: updateFlag ? userEditInfo.firstName : '',
      lastName: updateFlag ? userEditInfo.lastName : "",
      email: updateFlag ? userEditInfo.email : "",
      password: updateFlag ? userEditInfo.password : ""
    },
  });
  const createNewUser = (data) => {
    setError(null);
    let payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    dispatch(addUser(payload))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch((err) => {
        setError(err);
      });
  };
  const updateUserInfo = (data) => {
    let payload = {
      _id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    dispatch(updateUser(payload))
      .unwrap()
      .then(() => {
        navigate("/user");
      })
      .catch((err) => {
        setError(err.response.data);
        console.log(err);
      });
  };
  return (
    <ErrorBoundary fallback={<Error>Could not Load... Something went wrong</Error>}>
      {error && <Error flag={true}>{error}</Error>}
    <Container className="mt-2">
      <Row>
        <Col className="col-md-8-offset-md-2">
          <legend> {updateFlag ? 'Update User' :  'Create User' }</legend>
          <Form onSubmit={handleSubmit(updateFlag ? updateUserInfo : createNewUser)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (<Form.Control type="text" {...field} />)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicfirstname">
              <Form.Label>FirstName</Form.Label>
              <Controller
                control={control}
                name="firstName"
                render={({ field }) => (<Form.Control type="text" {...field} />)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasiclastname">
              <Form.Label>LastName</Form.Label>
              <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <Form.Control type="text" {...field} />
                  )}
                />

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <Form.Control type="password" {...field} />
                )}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </ErrorBoundary>
  );
};

export default AddUser;
