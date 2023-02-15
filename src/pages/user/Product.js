import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './product.css';
import { useMutation, useQueryClient } from 'react-query';
import {createProduct} from '../api';

const Product = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    e.persist();
    setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
  }

const queryClient = useQueryClient(); 
  const {status,error, mutate} =  useMutation({
    mutationFn: createProduct,
    onSuccess: (inputs) => {
      queryClient.setQueryData(['products', inputs._id], inputs)
      navigate(`/product/${inputs.id}`)
    },
});

const createProducts = (e) => {
  e.preventDefault();
  mutate(inputs)
}
  // const createProduct = async () => {
  //   try {
  //     const request = await axios.post(
  //       "https://lobster-app-ddwng.ondigitalocean.app/product/add_new",
  //       inputs,
  //       {
  //     headers: {
  //           "api_key": "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH"
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error)
  //   }

  // };
  // useEffect(() => {
  //   createProduct();
  //   navigate('/');
  // }, []);
  return (
    <>
      <div class="card-body">
        <form>
          <div class="form-group">
            <input
              type="text"
              onChange={handleInputChange}
              required=""
              class="form-control"
              placeholder="Product name"
              name="product_name"
              fdprocessedid="h8ntw"
            ></input>
          </div>
          <div class="form-group">
            <input
              type="number"
              required=""
              class="form-control"
              placeholder="Original Price"
              name="original_price"
              onChange={handleInputChange}
              fdprocessedid="y9iuye"
            ></input>
          </div>
          <div class="form-group">
            <input
              type="number"
              required=""
              class="form-control"
              placeholder="Sale Price"
              name="sale_price"
              onChange={handleInputChange}
              fdprocessedid="kwori"
            ></input>
          </div>
          <div class="form-group">
            <input
              type="number"
              required=""
              class="form-control"
              placeholder="Product Type"
              name="product_type"
              onChange={handleInputChange}
              fdprocessedid="2gi2m"
            ></input>
          </div>
          <div class="form-group">
            <textarea
              type="text"
              required=""
              class="form-control"
              placeholder="Description"
              name="description"
              onChange={handleInputChange}
              rows="4"
            ></textarea>
          </div>
          <div class="form-group">
            <input
              type="button"
              class="btn-primary"
              value="Create"
              onClick={(e) => createProducts(e)}
              fdprocessedid="odjp5p"
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default Product;
