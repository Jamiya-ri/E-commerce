import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext";

import "./ClientLogin.css";

const ClientLogin = () => {

  const navigate = useNavigate();

  const { setUser } = useUser();

  // =========================
  // FORM STATE
  
  // =========================
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/clients/login",
        form,
        {
          withCredentials: true,
        }
      );

      // =========================
      // SAVE USER
      // =========================
alert("Client Login Success");

// SAVE USER
setUser({
  ...res.data.client,
  role: "client",
});

navigate("/client");
      alert("Client Login Success");

      // =========================
      // REDIRECT
      // =========================
      navigate("/client");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    }

  };

  return (

    <div className="client-login-page">

      <form
        className="client-login-form"
        onSubmit={handleSubmit}
      >

        <h2>
          Client Login
        </h2>

        {/* USER ID */}
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={form.userId}
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
        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );

};

export default ClientLogin;