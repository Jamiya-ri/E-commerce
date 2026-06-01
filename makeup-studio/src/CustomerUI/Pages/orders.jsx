import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./orders.css";

const Orders = () => {

  const [orders, setOrders] =
    useState([]);

  // =========================
  // FETCH ORDERS
  // =========================
  useEffect(() => {

    const fetchOrders =
      async () => {

        try {

          const res = await axios.get(
  "http://localhost:5000/api/orders/my-orders",
  {
    withCredentials: true,
  }
);

          setOrders(res.data);

        } catch (err) {

          console.log(err);

        }

      };

    fetchOrders();

  }, []);

  return (

    <div className="orders-page">

      <div className="container">

        {/* HEADER */}
        <div className="orders-header">

          <h2>
            My Orders
          </h2>

          <p>
            Track all your purchased products
          </p>

        </div>

        {/* EMPTY */}
        {orders.length === 0 ? (

          <div className="empty-orders">

            <h3>
              No orders found 📦
            </h3>

          </div>

        ) : (

          <div className="orders-wrapper">

            {orders.map((order) => (

              <div
                className="order-card"
                key={order._id}
              >

                {/* TOP */}
                <div className="order-top">

                  <div>

                    <p>
                      Order ID
                    </p>

                    <h4>
                      {order.orderId}
                    </h4>

                  </div>

                  <div>

                    <span
                      className={`status ${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* CUSTOMER DETAILS */}
                <div className="customer-details">

                  <h4>
                    Delivery Details
                  </h4>

                  <p>
                    <b>Name:</b>{" "}
                    {order.customerName}
                  </p>

                  <p>
                    <b>Phone:</b>{" "}
                    {order.phone}
                  </p>

                  <p>
                    <b>Address:</b>{" "}
                    {order.address}
                  </p>

                  <p>
                    <b>City:</b>{" "}
                    {order.city}
                  </p>

                  <p>
                    <b>Pincode:</b>{" "}
                    {order.pincode}
                  </p>

                </div>

                {/* PRODUCTS */}
                <div className="order-products">

                  {order.products.map(
                    (item, index) => (

                      <div
                        className="order-product"
                        key={index}
                      >

                        <img
                          src={
                            item.productId?.image
                          }
                          alt={
                            item.productId?.name
                          }
                        />

                        <div className="product-info">

                          <h5>
                            {
                              item.productId?.brand
                            }
                          </h5>

                          <p>
                            {
                              item.productId?.name
                            }
                          </p>

                          <span>
                            Qty :
                            {" "}
                            {item.quantity}
                          </span>

                        </div>

                        <h4>

                          ₹
                          {
                            item.productId?.price
                          }

                        </h4>

                      </div>

                    )
                  )}

                </div>

                {/* BOTTOM */}
                <div className="order-bottom">

                  <div>

                    <p>
                      Ordered On
                    </p>

                    <h5>

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </h5>

                  </div>

                  <div>

                    <h3>

                      Total :
                      ₹
                      {order.totalAmount}

                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};

export default Orders;