import { Routes, Route } from "react-router-dom";

import ClientLayout from "../Layout/ClientLayout";

import Dashboard from "../Pages/dashboard";
import Products from "../Pages/products";
import AddProducts from "../Pages/addproducts";
import Orders from "../Pages/orders";
import ClientLogin from "../Pages/clientlogin";


const ClientRoutes = () => {

  return (

    <Routes>

      <Route path="login" element={<ClientLogin />} />


      <Route path="/" element={<ClientLayout />}>

        <Route index element={<Dashboard />} />

        <Route path="products" element={<Products />} />

        <Route path="add-product" element={<AddProducts />} />

        <Route path="orders" element={<Orders />} />

      </Route>

    </Routes>

  );
};

export default ClientRoutes;