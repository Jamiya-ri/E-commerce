import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useUser } from "../../context/UserContext";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaPlus,
} from "react-icons/fa";

import {
  useNavigate,
} from "react-router-dom";

import "./Products.css";

const Products = () => {

  // =========================
  // USER
  // =========================
  const {
    user,
    loading,
  } = useUser();

  const role =
    user?.role?.toLowerCase();

  console.log("USER:", user);
  console.log("ROLE:", role);

  // =========================
  // STATE
  // =========================
  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const navigate =
    useNavigate();

  // =========================
  // GET PRODUCTS
  // =========================
 useEffect(() => {

  const fetchProducts =
    async () => {

      try {

        let url = "";

        if (role === "admin") {

          url =
            "http://localhost:5000/api/products";

        }

        else if (
          role === "client"
        ) {

          url =
            "http://localhost:5000/api/products/my-products";

        }

        else {

          // CUSTOMER
          setProducts([]);
          return;

        }

        const res =
          await axios.get(
            url,
            {
              withCredentials: true,
            }
          );

        console.log(
          "PRODUCTS:",
          res.data
        );

        // SAFETY CHECK
        if (
          Array.isArray(
            res.data
          )
        ) {

          setProducts(
            res.data
          );

        }

        else {

          setProducts([]);

        }

      } catch (err) {

        console.log(
          "PRODUCT FETCH ERROR:",
          err
        );

        setProducts([]);

      }

    };

  // IMPORTANT
  if (
    !loading &&
    role
  ) {

    fetchProducts();

  }

}, [role, loading]);

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/products/${id}`,

          {
            withCredentials: true,
          }

        );

        // =========================
        // UPDATE UI
        // =========================
        setProducts(

          products.filter(
            (item) =>
              item._id !== id
          )

        );

      } catch (err) {

        console.log(err);

      }

    };

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit =
    (product) => {

      const route =

        role === "admin"

          ? "/admin/add-product"

          : "/client/add-product";

      navigate(
        route,
        {
          state: product,
        }
      );

    };

  // =========================
  // SEARCH FILTER
  // =========================
  const filteredProducts =

    Array.isArray(products)

      ? products.filter((item) =>

          item.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )

        )

      : [];

  // =========================
  // LOADING
  // =========================
  if (loading) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="products-page">

      {/* HEADER */}
      <div className="products-header">

        <div>

          <h2>
            Products
          </h2>

          <p>
            Manage your products
            easily
          </p>

        </div>

        {/* CLIENT ONLY */}
        {role === "client" && (

          <button
            className="add-product-btn"
            onClick={() =>
              navigate(
                "/client/add-product"
              )
            }
          >

            <FaPlus />

            Add Product

          </button>

        )}

      </div>

      {/* SEARCH */}
      <div className="products-controls">

        <div className="search-box">

          <FaSearch
            className="search-icon"
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

      </div>

      {/* TABLE */}
      <div className="products-table-wrapper">

        <table className="products-table">

          <thead>

            <tr>

              <th>
                Image
              </th>

              <th>
                Name
              </th>

              <th>
                Category
              </th>

              <th>
                Price
              </th>

              <th>
                Stock
              </th>

              <th>
                Shop
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (

              filteredProducts.map(
                (product) => (

                  <tr
                    key={product._id}
                  >

                    {/* IMAGE */}
                    <td>

                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.name
                        }
                        className="product-img"
                      />

                    </td>

                    {/* NAME */}
                    <td>
                      {product.name}
                    </td>

                    {/* CATEGORY */}
                    <td>
                      {product.category}
                    </td>

                    {/* PRICE */}
                    <td>
                      ₹{product.price}
                    </td>

                    {/* STOCK */}
                    <td>
                      {product.stock}
                    </td>

                    {/* SHOP */}
                    <td>
                      {
                        product.shopName
                      }
                    </td>

                    {/* STATUS */}
                    <td>

                      <span
                        className={`status ${
                          product.status
                            ?.replace(
                              /\s/g,
                              ""
                            )
                            .toLowerCase()
                        }`}
                      >

                        {
                          product.status
                        }

                      </span>

                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="action-buttons">
 {role === "client" && (

          <button
            className="edit-btn"
            onClick={() =>
              handleEdit(
                product
              )
            }
          >


                          <FaEdit />

          </button>

        )}
                       

                        {/* DELETE */}
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                        >

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  No products found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Products;