import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const dropdownRef = useRef();
  const [categories, setCategories] = useState([]);

  const { user, loading, setUser } = useUser();

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const role = user?.role?.toLowerCase();

  // CLOSE MOBILE NAVBAR
  const closeNavbar = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar) {
      navbar.classList.remove("show");
    }
  };

  // LOGOUT (FIXED)
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      navigate("/auth");
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  // OUTSIDE CLICK CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        // optional dropdown logic
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // FETCH CATEGORIES (SAFE)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/categories/list"
        );
        setCategories(res.data || []);
      } catch (err) {
        console.log(err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // ✅ IMPORTANT: after hooks
  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg customer-navbar fixed-top shadow-sm">
      <div className="container">

        {/* LOGO */}
        <NavLink to="/" className="customer-brand" onClick={closeNavbar}>
          <img src={logo} alt="Logo" height="40" className="me-2" />
          Shasa
        </NavLink>

        {/* TOGGLE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENU */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav me-3">

            {/* HOME */}
            <li className="nav-item">
              <NavLink
                to="/"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  isActive
                    ? "customer-link sketch-hover customer-active"
                    : "customer-link sketch-hover"
                }
              >
                Home
              </NavLink>
            </li>

            {/* PRODUCTS */}
            <li className="nav-item dropdown">
              <NavLink
                to="/products"
                className="customer-link sketch-hover dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Products
              </NavLink>

              <ul className="dropdown-menu customer-dropdown">
                {categories.map((cat, index) => (
                  <li key={index}>
                    <NavLink
                      className="customer-dropdown-item"
                      to={`/products/${cat}`}
                    >
                      {cat}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>

            {/* ABOUT */}
            <li className="nav-item">
              <NavLink
                to="/about"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  isActive
                    ? "customer-link sketch-hover customer-active"
                    : "customer-link sketch-hover"
                }
              >
                About
              </NavLink>
            </li>

            {/* CONTACT */}
            <li className="nav-item">
              <NavLink
                to="/contact"
                onClick={closeNavbar}
                className={({ isActive }) =>
                  isActive
                    ? "customer-link sketch-hover customer-active"
                    : "customer-link sketch-hover"
                }
              >
                Contact
              </NavLink>
            </li>

            {/* USER PROFILE */}
            <li className="nav-item dropdown ms-3">

              {user ? (
                <>
                  {/* AVATAR */}
                  <div
                    className="user-avatar dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {initial}
                  </div>

                  {/* DROPDOWN */}
                  <ul className="dropdown-menu customer-dropdown dropdown-menu-end">

                    <li>
                      <NavLink to="/cart" className="customer-dropdown-item">
                        Cart
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/wishlist" className="customer-dropdown-item">
                        Wishlist
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/orders" className="customer-dropdown-item">
                        Orders
                      </NavLink>
                    </li>

                    <li>
                      <button
                        className="btn btn-dark px-4 py-2 mt-3"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>

                  </ul>
                </>
              ) : (
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    isActive
                      ? "customer-link sketch-hover customer-active"
                      : "customer-link sketch-hover"
                  }
                >
                  Login
                </NavLink>
              )}

            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;