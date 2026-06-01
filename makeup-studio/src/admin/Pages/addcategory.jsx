import React, {
  useEffect,
  useState,
} from "react";

import {
  FaTrash,
  FaTags,
  FaPlus,
} from "react-icons/fa";

import axios from "axios";

import "./category.css";

const AddCategory = () => {

  const [name, setName] =
    useState("");

  const [categories,
    setCategories] =
    useState([]);

  // =========================
  // FETCH CATEGORIES
  // =========================
  const fetchCategories =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/categories",
            {
              withCredentials: true,
            }
          );

        setCategories(res.data);

      } catch (err) {

        console.log(err);

      }

    };

  useEffect(() => {

    fetchCategories();

  }, []);

  // =========================
  // ADD CATEGORY
  // =========================
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(

          "http://localhost:5000/api/categories/add",

          {
            name,
          },

          {
            withCredentials: true,
          }

        );

        alert(
          "Category Added Successfully"
        );

        setName("");

        fetchCategories();

      } catch (err) {

        console.log(err);

        alert(

          err.response?.data?.message ||

          "Error adding category"

        );

      }

    };

  // =========================
  // DELETE CATEGORY
  // =========================
  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(

          "Delete category and all products?"

        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(

          `http://localhost:5000/api/categories/${id}`,

          {
            withCredentials: true,
          }

        );

        alert(
          "Category Deleted Successfully"
        );

        fetchCategories();

      } catch (err) {

        console.log(err);

      }

    };

  return (

  <div className="category-page">

    {/* =========================
        FORM CARD
    ========================= */}
    <div className="category-form-card">

      <div className="title-box">

        <FaTags className="title-icon" />

        <h2>
          Category Management
        </h2>

      </div>

      <form
        onSubmit={handleSubmit}
        className="category-form"
      >

        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <button type="submit">

          <FaPlus />

          

        </button>

      </form>

    </div>

    {/* =========================
        TABLE CARD
    ========================= */}
    <div className="category-table-card">

      <div className="title-box">

        <FaTags className="title-icon" />

        <h2>
          Category List
        </h2>

      </div>

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>No</th>

              <th>Category</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {categories.length > 0 ? (

              categories.map(
                (item, index) => (

                  <tr key={item._id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.name}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(
                            item._id
                          )
                        }
                      >

                        <FaTrash />


                      </button>

                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>

                <td
                  colSpan="3"
                  style={{
                    textAlign:
                      "center",
                  }}
                >

                  No Categories Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

);

};

export default AddCategory;