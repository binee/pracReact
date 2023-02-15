import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import {getAllProductApi} from '../api';


const AllProduct = () => {
    const navigate = useNavigate();
    const {status,error,data:posts} =  useQuery('products', getAllProductApi);
if(status === 'loading') return <h1>Loading</h1>
if(error === 'error') return <h1>{error}</h1>

// const {
//     data,
//     error,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ['projects'],
//     queryFn: fetchProjects,
//     getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
//   })

const renderLoop = () => {
    const listInfo = posts.map((item) => {
      return (
        <>
          <tr key={item._id}>
            <td  onClick={() => navigate(`/product/${item._id}`)}>{item._id}</td>
            <td>{item.product_name}</td>
            <td>{item.original_price}</td>
            <td>{item.sale_price}</td>
            <td>{item.product_type}</td>
          </tr>
        </>
      );
    });

    return listInfo;
  };
  return (
    <>
    <div>Post</div>
    {renderLoop()}
    </>
  )
}

export default AllProduct