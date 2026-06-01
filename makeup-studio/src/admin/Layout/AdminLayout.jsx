import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {

  const fetchUser = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/me",
        {
          withCredentials: true,
        }
      );

      setUser(res.data.admin);

    } catch (err) {

      setUser(null);

    } finally {

      setLoading(false);

    }

  };

  fetchUser();

}, []);

 // ⏳ LOADING STATE
  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

// ❌ NOT ADMIN → REDIRECT LOGIN
if (!user || user.role !== "admin") {
  return <Navigate to="/admin/login" />;
}

  // 🔐 CHECK ADMIN LOGIN


 



  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      {/* SIDEBAR */}
      <Sidebar
  collapsed={collapsed}
  setCollapsed={setCollapsed}
  mobileOpen={mobileOpen}
  setMobileOpen={setMobileOpen}
  user={user}   // 👈 important
/>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {/* TOPBAR */}
        <Topbar user={user} setUser={setUser} setMobileOpen={setMobileOpen} />

        {/* PAGE CONTENT */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
