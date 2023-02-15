import { useEffect } from 'react';
import axios, { Axios } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { allCarsReceived, getAllCars, getLoading } from '../redux/cars/carslice'
import { Container } from 'react-bootstrap';
let contentScope = '';

const AllCars = () => {
  const allCarsInfo = useSelector(getAllCars);
  const loadingApi = useSelector(getLoading);
  const dispatch = useDispatch();
  useEffect(()=>{
    const ajaxCall = async() => {
      const req = await axios.get('http://localhost:5000/cars');
     dispatch(allCarsReceived(req.data));
    }
    ajaxCall();
  },[dispatch]);

  contentScope = loadingApi === true ?
   <Spinner animation="grow" /> : 
  <>
  <Row xs={1} md={3} className="g-2">
  {allCarsInfo.map((car) => (
    <Col key={car.id}>
      <Card>
        <Card.Img variant="top" src={car.image} />
        <Card.Body>
          <Card.Title>ccc{car.car}</Card.Title>
          <Card.Text>
            <span>{car.model}</span>
            <span>{car.year}</span>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
</>;
console.log(allCarsInfo);
  return <Container className='mt-2'>{contentScope}</Container>
}

export default AllCars;