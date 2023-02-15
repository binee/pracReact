import React, { useState, useEffect, useRef, useReducer } from "react";


function reducer(number, action) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "PREV":
      return number - 1;
    case "NEXT":
      return number + 1;
    case "reseting":
      return action.payload.amount;
  }
}
export const UsePagination = (props) => {
  const { post, currentPostFunction } = props;
  const [number, dispatch] = useReducer(reducer, 1);
  const [postPerPage, setPostPerPage] = useState(10);
  const PageCount = Math.ceil(post.length / postPerPage);
  const end = postPerPage * number;
  const begin = end - postPerPage;
  const currentData = post.slice(begin, end);
  const dropList = [10, 20, 30, 40, 50];
  useEffect(() => {
    currentPostFunction(currentData);
    console.log(currentData);
    dispatch({ type: "reseting", payload: { amount: number } });
  }, [post, number, end, begin, postPerPage]);
  const pages = [...Array(PageCount + 1).keys()].slice(1);

  return (
    <>
    <span><select onChange={(e) => setPostPerPage(e.target.value)}>
      {dropList.map((num) => (<option  value={num} key={num}>{num}</option>))}
      </select></span>
      <span onClick={() => dispatch({ type: "PREV" })}>Prev</span>
      {pages.map((count) => (
        <span
          className={count === number ? "paginationActive" : null}
          onClick={() =>
            dispatch({ type: "reseting", payload: { amount: count } })
          }
          key={count}
        >{`${count} | `}</span>
      ))}
      <span onClick={() => dispatch({ type: "NEXT" })}>Next</span>
    </>
  );
};
