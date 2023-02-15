import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {getAllProductId} from '../api';

const ProductDtl = () => {
    const {id} = useParams();
    const {status,error,data:posts} =  useQuery({
        queryKey : ["productsDtl", parseInt(id)],
        queryFn : () => getAllProductId(id),
});
if(status === 'loading') return <h1>Loading</h1>
if(error === 'error') return <h1>{error}</h1>

console.log(posts);

  return (<>
  <div>{posts}</div></>);
}

export default ProductDtl