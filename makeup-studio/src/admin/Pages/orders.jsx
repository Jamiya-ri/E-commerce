import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaEye,
  FaClock,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import "./orders.css";

import {
  useUser,
} from "../../context/UserContext";

const Orders = () => {

  // =====================
  // USER CONTEXT
  // =====================
  const {
    user,
    loading,
  } = useUser();

  const role =
    user?.role?.toLowerCase();

  // =====================
  // STATE
  // =====================
  const [orders, setOrders] =
    useState([]);

  const [selectedOrder,
    setSelectedOrder] =
    useState(null);

  const [showModal,
    setShowModal] =
    useState(false);

  // =====================
  // FETCH ORDERS
  // =====================
  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const url =

            role === "admin"

              ? "http://localhost:5000/api/orders/admin-orders"

              : "http://localhost:5000/api/orders/my-orders";

          const res =
            await axios.get(
              url,
              {
                withCredentials: true,
              }
            );

          setOrders(
            res.data
          );

        } catch (err) {

          console.log(
            "ORDER FETCH ERROR:",
            err
          );

        }

      };

    if (role) {

      fetchOrders();

    }

  }, [role]);
  // =====================
  // ORDER COUNTS
  // =====================

  const pendingCount =
    orders.filter(
      (o) => o.status === "Pending"
    ).length;

  const shippingCount =
    orders.filter(
      (o) => o.status === "Shipping"
    ).length;

  const deliveredCount =
    orders.filter(
      (o) => o.status === "Delivered"
    ).length;

  const cancelledCount =
    orders.filter(
      (o) => o.status === "Cancelled"
    ).length;
  // =====================
  // VIEW ORDER
  // =====================
  const handleView =
    (order) => {

      setSelectedOrder(order);

      setShowModal(true);

    };

  // =====================
  // UPDATE STATUS
  // =====================
    const handleStatusChange =
  async (id, status) => {

    try {

      await axios.put(

        `http://localhost:5000/api/orders/${id}`,

        { status },

        {
          withCredentials: true,
        }

      );

      setOrders((prev) =>

        prev.map((order) =>

          order._id === id

            ? {
                ...order,
                status,
              }

            : order
        )

      );

    } catch (err) {

      console.log(
        "STATUS UPDATE ERROR:",
        err
      );

    }

  };

  // =====================
  // LOADING
  // =====================
  if (loading) {

    return (
      <h2>
        Loading...
      </h2>
    );

  }

  return (

    <div className="orders-page">

      {/* =====================
          MODAL
      ===================== */}
     
     

      {showModal && selectedOrder && (

  <div
    className="modal-overlay"
    onClick={() => setShowModal(false)}
  >

    <div
      className="modal-content order-modal"
      onClick={(e) => e.stopPropagation()}
    >

      {/* HEADER */}
      <div className="modal-header">

        <h2>
          Order Details
        </h2>

        <button
          className="close-btn"
          onClick={() => setShowModal(false)}
        >
          ✖
        </button>

      </div>

      {/* DETAILS */}
      <div className="modal-section">

        <div className="info-row">
          <span>Customer Name</span>
          <p>{selectedOrder.customerName}</p>
        </div>

        <div className="info-row">
          <span>Phone Number</span>
          <p>{selectedOrder.phone}</p>
        </div>

        <div className="info-row">
          <span>Address</span>
          <p>{selectedOrder.address}</p>
        </div>

        <div className="info-row">
          <span>City</span>
          <p>{selectedOrder.city}</p>
        </div>

        <div className="info-row">
          <span>Pincode</span>
          <p>{selectedOrder.pincode}</p>
        </div>

        <div className="info-row">
          <span>Payment Method</span>
          <p>{selectedOrder.paymentMethod}</p>
        </div>

        <div className="info-row">
          <span>Notes</span>
          <p>
            {selectedOrder.notes || "No notes"}
          </p>
        </div>

      </div>

     

      {/* FOOTER */}
      <div className="modal-footer">

        <button
          className="close-order-btn"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>

      </div>

    </div>

  </div>

)}




{/* =====================
    ORDER STATUS CARDS
===================== */}

<div className="order-stats">

  {/* PENDING */}
  <div className="stat-card pending-card">

    <div className="stat-icon">
      <FaClock />
    </div>

    <div>

      <h3>
        Pending
      </h3>

      <p>
        {pendingCount}
      </p>

    </div>

  </div>

  {/* SHIPPING */}
  <div className="stat-card shipping-card">

    <div className="stat-icon">
      <FaTruck />
    </div>

    <div>

      <h3>
        Shipping
      </h3>

      <p>
        {shippingCount}
      </p>

    </div>

  </div>

  {/* DELIVERED */}
  <div className="stat-card delivered-card">

    <div className="stat-icon">
      <FaCheckCircle />
    </div>

    <div>

      <h3>
        Delivered
      </h3>

      <p>
        {deliveredCount}
      </p>

    </div>

  </div>

  {/* CANCELLED */}
  <div className="stat-card cancelled-card">

    <div className="stat-icon">
      <FaTimesCircle />
    </div>

    <div>

      <h3>
        Cancelled
      </h3>

      <p>
        {cancelledCount}
      </p>

    </div>

  </div>

</div>

      {/* =====================
          TABLE
      ===================== */}
      <table className="orders-table">

        <thead>

          <tr>

            {role === "client" && (
              <th>
                Order ID
              </th>
            )}

            <th>
              Customer
            </th>

            <th>
              Product
            </th>

            <th>
              Qty
            </th>

            <th>
              Amount
            </th>

            <th>
              Status
            </th>

            <th>
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.length > 0 ? (

            orders.map((order) => (

              <tr key={order._id}>

                {/* ORDER ID */}
                {role === "client" && (

                  <td>
                    {order.orderId}
                  </td>

                )}

                {/* CUSTOMER */}
                <td>

                  {
                    order.customerName
                  }

                </td>

                {/* PRODUCTS */}
                <td>

                  {order.products.map(
                    (p, i) => (

                      <div key={i}>
                        {
                          p.productId?.name
                        }
                      </div>

                    )
                  )}

                </td>

                {/* QUANTITY */}
                <td>

                  {order.products.map(
                    (p, i) => (

                      <div key={i}>
                        {p.quantity}
                      </div>

                    )
                  )}

                </td>

                {/* AMOUNT */}
                <td>

                  ₹
                  {
                    order.totalAmount
                  }

                </td>

                {/* STATUS */}
                <td>

                  {role === "client" ? (

                    <select

                      value={order.status}

                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }

                      className="status-select"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipping">
                        Shipping
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  ) : (

                    <span
                      className={`status-badge ${order.status?.toLowerCase()}`}
                    >

                      {
                        order.status
                      }

                    </span>

                  )}

                </td>

                {/* ACTION */}
                <td>

                  <button
                    className="view-btn"
                    onClick={() =>
                      handleView(order)
                    }
                  >

                    <FaEye />

                    {" "}View

                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="7"
                style={{
                  textAlign:
                    "center",
                }}
              >

                No Orders Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default Orders;