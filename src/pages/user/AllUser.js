import React, { useEffect, useState, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllUser,
  getAllUser,
  getLoading,
  deleteUser,
} from "../../redux/user/userslice";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import DeleteModal from "../../components/shared/DeleteModal";

const userContent = "";
const AllUser = () => {
  const [modal, setModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const userInfo = useSelector(getAllUser);
  const loadingApi = useSelector(getLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const hideDeleteModal = () => {
    setModal(false);
    setItemToDeleteId(null);
  };

  const showDeleteModal = (id) => {
    setModal(true);
    setItemToDeleteId(id);
  };

  const deleteUserInfo = () => {
    let payload = {
      _id: itemToDeleteId
    };
    dispatch(deleteUser(payload._id))
      .unwrap()
      .then(() => {
        console.log("DELETED");
        setModal(false);
        setItemToDeleteId(null);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const userContent =
    loadingApi === true ? (
      <Spinner animation="grow" />
    ) : (
      <>
      
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.map((user, index) => (
              <tr key={user._id}>
                <td>{++index}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  <Button
                    variant="primary"
                    type="button"
                    name="edit"
                    onClick={() => navigate(`/user/editUser/${user._id}`)}
                  >
                    Edit
                  </Button>{" "}
                  &nbsp;
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => showDeleteModal(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  return <>
  <DeleteModal 
  title="Delete Confirmation!"
  body="Are sure to delete this user"
  modal={modal}
  hideDeleteModal={hideDeleteModal}
  showDeleteModal={showDeleteModal}
  deleteUserInfo={deleteUserInfo}>

  </DeleteModal>
   <Container>{userContent}</Container>;</>
};

export default AllUser;
