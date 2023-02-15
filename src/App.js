import "./App.css";
import {useState} from 'react';
import Layout from "./components/shared/Layout";
import AllCars from "./pages/AllCars";
import AllUser from "./pages/user/AllUser";
import AddUser from "./pages/user/AddUser";
import Home from "./pages/Home"; 
import Product from './pages/user/Product';
import { Login } from "./pages/Login";
import { AuthContextProvider } from "./components/shared/AuthContext";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import ProductDtl from "./pages/user/ProductDtl";

const queryClient = new QueryClient()

function App() {
  const [val,setVal]=useState(0);
   const handleClickBtn= ()=>{    setVal(1)  } 
  return (
    <>
       <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools />
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/addProduct" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cars" element={<AllCars />}></Route>
          <Route path="/cars/add" element={<addCar />}></Route>
          <Route path="/product/:id" element={<ProductDtl />}></Route>
          <Route path='/user' element={<AllUser />}></Route>
          <Route path='/user/addUser' element={<AddUser />}></Route>
          <Route path='/user/editUser/:id' element={<AddUser />}></Route>
        </Routes>
      </Layout>
      </AuthContextProvider>
      </QueryClientProvider>
        {val == 0 ? <p>InValid</p>:<p>Valid</p>}        <button data-testid="btn" onClick={handleClickBtn}>Click</button>  
    </>
  );
}

export default App;
