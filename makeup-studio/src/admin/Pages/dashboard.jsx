import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useUser } from "../../context/UserContext";

import "./dashboard.css";

const Dashboard = () => {

  // =======================
  // AUTH
  // =======================
  const { user, loading } = useUser();

  const role = user?.role?.toLowerCase();
  console.log(role)
  // =======================
  // STATE
  // =======================
  const [products, setProducts] =
    useState(0);

  const [orders, setOrders] =
    useState(0);

  const [users, setUsers] =
    useState(0);

  const [revenue, setRevenue] =
    useState(0);

  const [recentOrders, setRecentOrders] =
    useState([]);

  const [salesData, setSalesData] =
    useState([]);

  const [clients, setClients] =
    useState(0);

  // =======================
  // FETCH DATA
  // =======================
  useEffect(() => {

    const fetchData = async () => {

      try {

        // =======================
        // API URLS
        // =======================
        const productUrl =
          role === "admin"
            ? "http://localhost:5000/api/products"
            : "http://localhost:5000/api/products/my-products";

        const orderUrl =
          role === "admin"
            ? "http://localhost:5000/api/orders/admin-orders"
            : "http://localhost:5000/api/orders/my-orders";

        // =======================
        // FETCH PRODUCTS
        // =======================
        const productRes =
          await axios.get(productUrl)
            .catch(() => ({
              data: [],
            }));

        // =======================
        // FETCH ORDERS
        // =======================
        const orderRes =
          await axios.get(orderUrl)
            .catch(() => ({
              data: [],
            }));

        const productsData =
          productRes.data || [];

        const ordersData =
          orderRes.data || [];

        // =======================
        // ADMIN ONLY
        // =======================
        if (role === "admin") {

          const userRes =
            await axios.get(
              "http://localhost:5000/api/auth/users"
            ).catch(() => ({
              data: [],
            }));

          const clientRes =
            await axios.get(
              "http://localhost:5000/api/clients",
              {
                withCredentials: true,
              }
            ).catch(() => ({
              data: [],
            }));

          setUsers(
            userRes.data.length || 0
          );

          setClients(
            clientRes.data.length || 0
          );

        }

        // =======================
        // COUNTS
        // =======================
        setProducts(
          productsData.length
        );

        setOrders(
          ordersData.length
        );

        // =======================
        // REVENUE
        // =======================
        const total =
          ordersData.reduce(
            (acc, item) =>
              acc +
              (item.totalAmount || 0),
            0
          );

        setRevenue(total);

        // =======================
        // RECENT ORDERS
        // =======================
        setRecentOrders(
          ordersData
            .slice(-5)
            .reverse()
        );

        // =======================
        // SALES CHART
        // =======================
        const monthly = {};

        ordersData.forEach(
          (order) => {

            if (!order.createdAt)
              return;

            const date =
              new Date(
                order.createdAt
              );

            const month =
              date.toLocaleString(
                "default",
                {
                  month: "short",
                }
              );

            monthly[month] =
              (monthly[month] || 0) +
              (order.totalAmount || 0);

          }
        );

        const chart =
          Object.keys(monthly).map(
            (m) => ({
              month: m,
              sales: monthly[m],
            })
          );

        setSalesData(chart);

      } catch (err) {

        console.log(
          "Dashboard error:",
          err
        );

      }

    };

    if (role) {
      fetchData();
    }

  }, [role]);

  if (loading) {
  return <h2>Loading...</h2>;
}

  return (

    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">

        <h2>
          Dashboard Overview
        </h2>

        <p>
          Welcome back 👋
        </p>

      </div>

      {/* CARDS */}
      <div className="dashboard-cards">

        {/* PRODUCTS */}
        <div className="dashboard-card">

          <div className="card-icon">
            <FaBox />
          </div>

          <div>
            <h3>{products}</h3>
            <p>
              Total Products
            </p>
          </div>

        </div>

        {/* ORDERS */}
        <div className="dashboard-card">

          <div className="card-icon">
            <FaShoppingCart />
          </div>

          <div>
            <h3>{orders}</h3>
            <p>
              Total Orders
            </p>
          </div>

        </div>

        {/* REVENUE */}
        <div className="dashboard-card">

          <div className="card-icon">
            <FaMoneyBillWave />
          </div>

          <div>
            <h3>
              ₹{revenue}
            </h3>

            <p>
              Total Revenue
            </p>
          </div>

        </div>

        {/* ADMIN ONLY */}
        {role === "admin" && (

          <>
            {/* USERS */}
            <div className="dashboard-card">

              <div className="card-icon">
                <FaUsers />
              </div>

              <div>
                <h3>{users}</h3>
                <p>
                  Total Users
                </p>
              </div>

            </div>

            {/* CLIENTS */}
            <div className="dashboard-card">

              <div className="card-icon">
                <FaUserTie />
              </div>

              <div>
                <h3>{clients}</h3>
                <p>
                  Total Clients
                </p>
              </div>

            </div>

          </>

        )}

      </div>

      {/* CHART */}
      <div className="chart-card">

        <h3>
          Sales Analytics
        </h3>

        {salesData.length > 0 ? (

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={salesData}>

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="sales"
                fill="#fcdce5"
                radius={[
                  10,
                  10,
                  0,
                  0,
                ]}
              />

            </BarChart>

          </ResponsiveContainer>

        ) : (

          <p>
            No sales data available
          </p>

        )}

      </div>

      {/* RECENT ORDERS */}
      <div className="recent-orders">

        <h3>
          Recent Orders
        </h3>

        <table>

          <thead>

            <tr>

              
                    {role === "admin" && (
                      <th>
                        
                          Shop Name
                        
                      </th>
                    )}

              {role === "client" && (
                <th>
                  Order ID
                </th>
              )}

              <th>
                Customer
              </th>

              <th>
                Status
              </th>

              <th>
                Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {recentOrders.length > 0 ? (

              recentOrders.map(
                (order) => (

                  <tr
                    key={order._id}
                  >

                    {/* ADMIN ONLY */}
                    {role === "admin" && (
                      <td>
                        {
                          order.shopName
                        }
                      </td>
                    )}
                    {/* CLIENT ONLY */}
                    {role === "client" && (
                      <td>
                        {
                          order.orderId
                        }
                      </td>
                    )}

                    {/* CUSTOMER */}
                    <td>
                      {
                        order.customerName
                      }
                    </td>

                    {/* STATUS */}
                    <td>

                      <span
                        className={`status ${order.status?.toLowerCase()}`}
                      >
                        {
                          order.status
                        }
                      </span>

                    </td>

                    {/* AMOUNT */}
                    <td>
                      ₹
                      {
                        order.totalAmount
                      }
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="4"
                >
                  No recent orders
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Dashboard;