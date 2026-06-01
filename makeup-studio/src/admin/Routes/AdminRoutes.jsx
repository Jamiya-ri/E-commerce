import { Routes, Route } from "react-router-dom";

import AdminLayout from "../Layout/AdminLayout";

import AdminLogin from "../Pages/adminlogin";
import Dashboard from "../Pages/dashboard";
import Products from "../Pages/products";
import AddProducts from "../Pages/addproducts";
import Orders from "../Pages/orders";
import AddClient from "../Pages/addclient";
import ClientList from "../Pages/clientlist"
import AddCategory from "../Pages/addcategory";


const AdminRoutes = () => {
  return (
    <Routes>
      {/* LOGIN */}
      <Route path="login" element={<AdminLogin />} />

      {/* ADMIN LAYOUT */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="add-product" element={<AddProducts />} />
        <Route path="orders" element={<Orders />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="add-client" element={<AddClient />} />
        <Route path="add-categories" element={<AddCategory />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
