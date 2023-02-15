import React, { useEffect, useState } from "react";
import axios from "axios";
import "./product.css";
import Table from "react-bootstrap/Table";
import { UsePagination } from "../../components/shared/UsePagination";

const SearchBar = ({ searchTable }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        //value={searchValue}
        onChange={(e) => searchTable(e.target.value)}
      />
    </div>
  );
};

const ProductList = () => {
  const [list, setList] = useState([]);
  const [post, setPost] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  const column = ["_id", "product_name"];
  const [sorting, setSorting] = useState({
    column: "product_name",
    order: "asc",
  });
  const isDescSorting = sorting.column != null && sorting.order === "desc";
  const isAscSorting = sorting.column != null && sorting.order === "asc";
  const futureSortingOrder = isDescSorting ? "asc" : "desc";

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        "https://lobster-app-ddwng.ondigitalocean.app/product/list",
        {
          headers: {
            api_key: "Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH",
          },
        }
      );
      setList(res.data.message);
    } catch (error) {
      throw new Error(error);
    }
  };
  const currentPostFunction = (itemData) => {
    setPost(itemData);
   setFilteredData(itemData)
  };
  const renderLoop = () => {
    const listInfo = post.map((item, index) => {
      return (
        <>
          <tr key={index}>
            <td>{item._id}</td>
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

  const sortTable = (newSorting) => {
    let data = [];
    setSorting(newSorting);
    if (newSorting.order === "asc") {
      data = post.sort((a, b) => (a.product_name > b.product_name ? 1 : -1));
    } else if (newSorting.order === "desc") {
      data = post.sort((a, b) => (b.product_name > a.product_name ? 1 : -1));
    }
    setPost(data);
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  const searchContent = (newSearchValue) =>{
    const listData= searchTable(newSearchValue);
    console.log(listData);
    if(Array.isArray(listData) && listData.length > 0){
      setPost(listData);

    }
    else if(newSearchValue === ''){
      console.log(filteredData)
      setPost(filteredData);
    }
    else{
      console.log('No Rcord Found')
      const arry = ['No Record Found']
    }
    //
  }
  const searchTable = (newSearchValue) => {
    // setSearchValue(newSearchValue);
    if (newSearchValue !== "") {
      return list.filter((item) => 
        item.product_name.toLowerCase().includes(newSearchValue.toLowerCase())
      );
  };
}

  return (
    <>
      <div className="data_table_container">
        <h4>All Products</h4>
        <SearchBar searchTable={searchContent} />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Product ID</th>
              <th
                sorting={sorting}
                onClick={() =>
                  sortTable({
                    column: "product_name",
                    order: futureSortingOrder,
                  })
                }
              >
                Product ID
                {isDescSorting && <span>▼</span>}
                {isAscSorting && <span>▲</span>}
              </th>
              <th>Original Price</th>
              <th>Sale Price</th>
              <th>Product Type</th>
            </tr>
          </thead>
          <tbody>{renderLoop()}</tbody>
        </Table>

        <UsePagination post={list} currentPostFunction={currentPostFunction} />
      </div>
    </>
  );
};
export default ProductList;
