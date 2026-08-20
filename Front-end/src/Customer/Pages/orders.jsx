import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  // =========================
  // FETCH ORDERS
  // =========================
  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          {
            headers: {
              authorization: window.token,
            },
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

        <div className="orders-header">

          <h2>My Orders</h2>

          <p>
            Track all your purchased products
          </p>

        </div>

        {orders.length === 0 ? (

          <div className="empty-orders">

            <h3>No orders found 📦</h3>

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

                    

                    <h4>
                      {order.orderId}
                    </h4>

                  </div>

                  <div>

                    <h5>
                      {order.status}
                    </h5>

                  </div>

                </div>

                {/* PRODUCTS */}
                <div className="order-products">

                  {order.products.map((item) => (

                    <div
                      className="order-product"
                      key={item._id}
                    >

                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                      />

                      <div>

                        <h5>
                          {item.productId.brand}
                        </h5>

                        <p>
                          {item.productId.name}
                        </p>

                        <span>
                          Qty: {item.quantity}
                        </span>

                      </div>

                      <h4>
                        ₹
                        {item.productId.price}
                      </h4>

                    </div>

                  ))}

                </div>

                {/* TOTAL */}
                <div className="order-bottom">

                  <h3>
                    Total :
                    ₹{order.totalAmount}
                  </h3>

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