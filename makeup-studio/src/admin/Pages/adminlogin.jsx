import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import "./adminlogin.css";

axios.defaults.withCredentials = true;

const AdminLogin = () => {

  const navigate = useNavigate();

  // =========================
  // USER CONTEXT
  // =========================
  const { setUser } = useUser();

  // =========================
  // STATE
  // =========================
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);
  

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(

        "http://localhost:5000/api/admin/login",

        {
          email,
          password,
        },

        {
          withCredentials: true,
        }

      );

      // =========================
      // SAVE ADMIN
      // =========================
      setUser(res.data.admin);

      alert(res.data.message);

      // =========================
      // REDIRECT
      // =========================
      navigate("/admin");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="admin-login-page">

      {/* LEFT */}
      <div className="login-left">

        <div className="overlay"></div>

        <div className="login-left-content">

          <h1>
            Shasa Admin
          </h1>

          <p>
            Manage products, orders,
            customers & analytics
          </p>

        </div>

      </div>

      {/* RIGHT */}
      <div className="login-right">

        <div className="login-card">

          <h2>
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="input-group">

              <label>
                Email
              </label>

              <div className="input-box">

                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div className="input-group">

              <label>
                Password
              </label>

              <div className="input-box">

                <FaLock />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  className="eye-btn"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  }

                </button>

              </div>

            </div>

            {/* BUTTON */}
            <button
              className="login-btn"
              type="submit"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};

export default AdminLogin;