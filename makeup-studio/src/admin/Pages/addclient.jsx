import React, { useEffect, useState } from "react";

import axios from "axios";

import { useLocation, useNavigate } from "react-router-dom";

import "./addclient.css";

const AddClient = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const editClient = location.state?.client;

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    shopName: "",

    name: "",

    userId: "",

    email: "",

    phone: "",

    password: "",
  });

  // =========================
  // LOAD CLIENT DATA
  // =========================
  useEffect(() => {
    if (editClient) {
      setEditId(editClient._id);

      setForm({
        shopName: editClient.shopName || "",

        name: editClient.name || "",

        userId: editClient.userId || "",

        email: editClient.email || "",

        phone: editClient.phone || "",

        password: editClient.plainpassword || "",
      });
    }
  }, [editClient]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/clients/${editId}`,

          form,

          {
            withCredentials: true,
          },
        );

        alert("Client Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/clients/create",

          form,

          {
            withCredentials: true,
          },
        );

        alert("Client Created Successfully");
      }

      setForm({
        shopName: "",

        name: "",

        userId: "",

        email: "",

        phone: "",

        password: "",
      });

      setEditId(null);

      navigate("/admin/clients");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  return (
    <div className="client-page">
      <div className="client-card">
        <h2>{editId ? "Update Client" : "Create Client"}</h2>

        <form onSubmit={handleSubmit} className="client-form">
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={form.shopName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Client Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={form.userId}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editId ? "Update Client" : "Create Client"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
