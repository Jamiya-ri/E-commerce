import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import axios from "axios";

const UserContext =
  createContext();

export const UserProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          // =========================
          // CHECK ADMIN
          // =========================
          try {

            const adminRes =
              await axios.get(
                "http://localhost:5000/api/admin/me",
                {
                  withCredentials: true,
                }
              );

            if (
              adminRes.data?.admin
            ) {

              setUser(
                adminRes.data.admin
              );

              setLoading(false);

              return;

            }

          } catch (err) {}

          // =========================
          // CHECK CLIENT
          // =========================
          try {

            const clientRes =
              await axios.get(
                "http://localhost:5000/api/clients/me",
                {
                  withCredentials: true,
                }
              );

            if (
              clientRes.data?.role ===
              "client"
            ) {

              setUser(clientRes.data);

              setLoading(false);

              return;

            }

          } catch (err) {}

          // =========================
          // CHECK CUSTOMER
          // =========================
          try {

            const customerRes =
              await axios.get(
                "http://localhost:5000/api/auth/me",
                {
                  withCredentials: true,
                }
              );

            if (
              customerRes.data?.role ===
              "customer"
            ) {

              setUser(
                customerRes.data
              );

              setLoading(false);

              return;

            }

          } catch (err) {}

          // =========================
          // NO USER
          // =========================
          setUser(null);

        } catch (err) {

          console.log(err);

          setUser(null);

        } finally {

          setLoading(false);

        }

      };

    fetchUser();

  }, []);

  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >

      {children}

    </UserContext.Provider>

  );

};

export const useUser =
  () => useContext(UserContext);