import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import "./clientlist.css";

const ClientList = () => {
  const [clients, setClients] = useState([]);

  // =========================
  // FETCH CLIENTS
  // =========================
  const fetchClients = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/clients",
        {
          withCredentials: true,
        }
      );

      setClients(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // =========================
  // DELETE CLIENT
  // =========================
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure want to delete this client?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/api/clients/${id}`,
        {
          withCredentials: true,
        }
      );

      alert("Client deleted");

      fetchClients();

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // EDIT CLIENT
  // =========================
  const handleEdit = async (client) => {

    const name = prompt("Enter Name", client.name);
    const shopName = prompt("Enter Shop Name", client.shopName);
    const userId = prompt("Enter User ID", client.userId);

    if (!name || !shopName || !userId) {
      return;
    }

    try {

      await axios.put(
        `http://localhost:5000/api/clients/${client._id}`,
        {
          name,
          shopName,
          userId,
        },
        {
          withCredentials: true,
        }
      );

      alert("Client updated");

      fetchClients();

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <>
     <div className="client-header">
        <h2>Clients List</h2>
      </div>
    <div className="client-table">

     

      <div className="table-wrapper">

        <table className="client-table">

          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Client Name</th>
              <th>User ID</th>
              <th>Password</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {clients.length > 0 ? (

              clients.map((c) => (

                <tr key={c._id}>

                  <td>{c.shopName}</td>

                  <td>{c.name}</td>

                  <td>{c.userId}</td>

                  <td>{c.plainpassword}</td>

                  <td>

                    <div className="action-buttons">

                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(c)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(c._id)}
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="empty-row">
                  No Clients Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
    </>
  );
};

export default ClientList;