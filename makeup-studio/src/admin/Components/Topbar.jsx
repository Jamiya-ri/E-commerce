import React, { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaBox,
  FaPlus,
  FaReceipt,
  FaTimes,
  FaHome,
  FaUsers,
  FaLayerGroup,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import axios from "axios";

import "./Topbar.css";

const Topbar = ({ user, setUser }) => {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const navigate =
    useNavigate();

  // =========================
  // BASE ROUTE
  // =========================
  const baseRoute =
    user?.role === "client"
      ? "/client"
      : "/admin";

  // =========================
  // LOGOUT
  // =========================
  const handleLogout =
    async () => {

      try {

        const logoutUrl =

          user?.role === "client"

            ? "http://localhost:5000/api/clients/logout"

            : "http://localhost:5000/api/admin/logout";

        await axios.post(
          logoutUrl,
          {},
          {
            withCredentials: true,
          }
        );

        setUser(null);

        navigate(
          user?.role === "client"
            ? "/client/login"
            : "/admin/login"
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <>

      {/* =========================
          TOPBAR
      ========================= */}
      <nav className="topbar">

        {/* LEFT */}
        <div className="topbar-left">

          <button
            className="mobile-toggle"
            onClick={() =>
              setMenuOpen(true)
            }
          >

            <FaBars />

          </button>

          <h3 className="desktop-title">

            {user?.role === "client"
              ? "Client Panel"
              : "Admin Panel"}

          </h3>

        </div>

        {/* RIGHT */}
        <div className="topbar-right">

          {/* NOTIFICATION */}
          <div className="notification">

            <FaBell />

            <span className="badge">
              2
            </span>

          </div>

          {/* PROFILE */}
          <div className="profile-box">

            <FaUserCircle className="profile-icon" />

            <div className="profile-details">

              <h4>
                {user?.name || "User"}
              </h4>

              <p>
                {user?.role || "Panel"}
              </p>

            </div>

          </div>

          {/* LOGOUT */}
          {user && (

            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              Logout

            </button>

          )}

        </div>

      </nav>

      {/* =========================
          OVERLAY
      ========================= */}
      {menuOpen && (

        <div
          className="mobile-menu-overlay"
          onClick={() =>
            setMenuOpen(false)
          }
        ></div>

      )}

      {/* =========================
          MOBILE MENU
      ========================= */}
      <div
        className={`mobile-menu-drawer ${
          menuOpen ? "open" : ""
        }`}
      >

        {/* HEADER */}
        <div className="mobile-menu-header">

          <h2>
            Shasa
          </h2>

          <button
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <FaTimes />

          </button>

        </div>

        {/* LINKS */}
        <div className="mobile-menu-links">

          {/* DASHBOARD */}
          <NavLink
            to={baseRoute}
            end
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <FaHome />

            <span>
              Dashboard
            </span>

          </NavLink>

          {/* PRODUCTS */}
          <NavLink
            to={`${baseRoute}/products`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <FaBox />

            <span>
              Products
            </span>

          </NavLink>

          {/* CLIENT ONLY */}
          {user?.role === "client" && (

            <NavLink
              to="/client/add-product"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              <FaPlus />

              <span>
                Add Product
              </span>

            </NavLink>

          )}

          {/* ORDERS */}
          <NavLink
            to={`${baseRoute}/orders`}
            onClick={() =>
              setMenuOpen(false)
            }
          >

            <FaReceipt />

            <span>
              Orders
            </span>

          </NavLink>

          {/* ADMIN ONLY */}
          {user?.role === "admin" && (

            <>

              <NavLink
                to="/admin/clients"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <FaUsers />

                <span>
                  Clients
                </span>

              </NavLink>

              <NavLink
                to="/admin/add-client"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <FaPlus />

                <span>
                  Add Client
                </span>

              </NavLink>

              <NavLink
                to="/admin/add-categories"
                onClick={() =>
                  setMenuOpen(false)
                }
              >

                <FaLayerGroup />

                <span>
                  Add Category
                </span>

              </NavLink>

            </>

          )}

        </div>

      </div>

    </>

  );

};

export default Topbar;