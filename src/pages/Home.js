import React from 'react'
import Card from 'react-bootstrap/Card';
import AllProduct from './user/AllProduct';
import Product  from './user/Product';
import ProductList  from './user/ProductList';

const Home = () => {
  return (
    <div>
          <Card>
      <Card.Body>
         <Card.Text>
          {/* <AllProduct /> */}
          <Product/>
          <ProductList />
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Home