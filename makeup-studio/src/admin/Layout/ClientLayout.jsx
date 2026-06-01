import React, { useEffect, useState } from "react";

import axios from "axios";

import { Outlet, Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const ClientLayout = () => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [collapsed, setCollapsed] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clients/me", {
          withCredentials: true,
        });

        setUser({
          ...res.data,
          role: "client",
        });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, []);

  if (loading) return <h2>Loading...</h2>;

  if (!user) {
    return <Navigate to="/client/login" />;
  }

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        user={user}
      />

      <div className="main-content">
        <Topbar user={user} setUser={setUser} />

        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
