
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

import {
  FaHome,
  FaBox,
  FaPlus,
  FaReceipt,
  FaBars,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  user,
}) => {

  // ===================================
  // BASE ROUTE
  // ===================================
  const baseRoute =
    user?.role === "client"
      ? "/client"
      : "/admin";

  return (
    <>
      {/* SIDEBAR */}
      <aside
        className={`sidebar
        ${collapsed ? "closed" : ""}
        ${mobileOpen ? "open" : ""}
      `}
      >
        {/* LOGO */}
        <div className="logo-area">
          <NavLink to={baseRoute} className="logo-link">
            {!collapsed && <img src={logo} width="50" alt="logo" />}

            {!collapsed && <span className="logo-title">Shasa</span>}
          </NavLink>

          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>

        {/* NAVIGATION */}
        <ul className="nav-menu">
          {/* DASHBOARD */}
          <li>
            <NavLink to={baseRoute} end className="nav-link">
              <FaHome />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>

          {/* PRODUCTS */}
          <li>
            <NavLink to={`${baseRoute}/products`} className="nav-link">
              <FaBox />
              {!collapsed && <span>Products</span>}
            </NavLink>
          </li>

          {/* ADD PRODUCT */}
          {user?.role === "client" && (
            <li>
              <NavLink to="/client/add-product" className="nav-link">
                <FaPlus />
                {!collapsed && <span>Add Product</span>}
              </NavLink>
            </li>
          )}

          {/* ORDERS */}
          <li>
            <NavLink to={`${baseRoute}/orders`} className="nav-link">
              <FaReceipt />
              {!collapsed && <span>Orders</span>}
            </NavLink>
          </li>

          {/* ADMIN ONLY */}
          {user?.role === "admin" && (
            <>
              <li>
                <NavLink to="/admin/clients" className="nav-link">
                  <FaUsers />
                  {!collapsed && <span>Clients</span>}
                </NavLink>
              </li>

              <li>
                <NavLink to="/admin/add-client" className="nav-link">
                  <FaPlus />
                  {!collapsed && <span>Add Client</span>}
                </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/add-categories" className="nav-link">
                    <FaLayerGroup />
                    {!collapsed && <span>Add Category</span>}
                  </NavLink>
                </li>
              
            </>
          )}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;



