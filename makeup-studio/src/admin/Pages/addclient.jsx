import React, { useState } from "react";
import axios from "axios";

import "./addclient.css";

const AddClient = () => {

  // =====================================
  // FORM STATE
  // =====================================
  const [form, setForm] = useState({
    shopName: "",
    name: "",
    userId: "",
    password: "",
  });

  // =====================================
  // INPUT CHANGE
  // =====================================
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // =====================================
  // SUBMIT
  // =====================================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...form,

      };

      await axios.post(
        "http://localhost:5000/api/clients/create",
        payload,
        {
          withCredentials: true,
        }
      );

      alert("Client Created Successfully 🚀");

      // RESET
      setForm({
        shopName: "",
        name: "",
        userId: "",
        password: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Error creating client"
      );

    }

  };

  return (

    <div className="client-page">

      <div className="client-card">

        <h2>Create Client</h2>

        <form
          onSubmit={handleSubmit}
          className="client-form"
        >

          {/* SHOP NAME */}
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={form.shopName}
            onChange={handleChange}
            required
          />

          

          {/* CLIENT NAME */}
          <input
            type="text"
            name="name"
            placeholder="Client Name"
            value={form.name}
            onChange={handleChange}
            required
          />

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
            Create Client
          </button>

        </form>

      </div>

    </div>

  );

};

export default AddClient;