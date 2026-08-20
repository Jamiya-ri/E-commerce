import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api";

import "./auth.css";

import { useUser } from "../../context/UserContext";

const Auth = () => {
  const navigate = useNavigate();

  const { setUser } = useUser();

  // ======================
  // LOGIN / REGISTER TOGGLE
  // ======================
  const [isLogin, setIsLogin] = useState(true);

  // ======================
  // FORM STATE
  // ======================
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // REGISTER
  // ======================
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", form, {
        withCredentials: true,
      });

      alert("Registered successfully ✅");

      // RESET FORM
      setForm({
        name: "",
        email: "",
        password: "",
      });

      // SWITCH TO LOGIN
      setIsLogin(true);
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Register failed");
    }
  };

  // ======================
  // LOGIN
  // ======================
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/api/auth/login",

        {
          email: form.email,
          password: form.password,
        },

        {
          withCredentials: true,
        },
      );

      console.log("LOGIN RESPONSE:", res.data);

      // ======================
      // SAVE USER CONTEXT
      // ======================
      setUser(res.data.user);

      // ======================
      // SAVE LOCAL STORAGE
      // ======================
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful 🚀");

      // ======================
      // REDIRECT
      // ======================
      navigate("/");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* ======================
            LEFT SIDE
        ====================== */}
        <div className="auth-left">
          <h2>Welcome 👋</h2>

          <p>
            {isLogin ? "Login to continue shopping" : "Create your account"}
          </p>
        </div>

        {/* ======================
            RIGHT SIDE
        ====================== */}
        <div className="auth-right">
          <h3>{isLogin ? "Login" : "Register"}</h3>

          <form onSubmit={isLogin ? handleLogin : handleRegister}>
            {/* REGISTER NAME */}
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />

            {/* PASSWORD */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* BUTTON */}
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>

          {/* TOGGLE */}
          <p className="toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
