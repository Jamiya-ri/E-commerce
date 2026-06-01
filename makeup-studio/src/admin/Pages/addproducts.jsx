import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaBox,
  FaTag,
  FaDollarSign,
  FaLayerGroup,
  FaClipboardList,
  FaCloudUploadAlt,
} from "react-icons/fa";

import "./addproducts.css";

const AddProducts = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const editProduct = location.state;

  const isEdit = Boolean(editProduct);

  const [preview, setPreview] = useState(null);

  const [image, setImage] = useState(null);

  // category

  const [categories, setCategories] = useState([]);

  // =====================================
  // CLIENT CATEGORY
  // =====================================
  const [clientCategory, setClientCategory] = useState("");

  // =====================================
  // FORM DATA
  // =====================================
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    brand: "",
    stock: "",
    status: "In Stock",
    description: "",
  });

  // =====================================
  // FETCH CLIENT DATA
  // =====================================
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/clients/me", {
          withCredentials: true,
        });

        // ADMIN CREATED CATEGORY
        setClientCategory(res.data.category || "");
      } catch (err) {
        console.log(err);
      }
    };

    fetchClient();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");

        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  // =====================================
  // EDIT PREFILL
  // =====================================
  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || "",
        category: editProduct.category || "",
        price: editProduct.price || "",
        brand: editProduct.brand || "",
        stock: editProduct.stock || "",
        status: editProduct.status || "In Stock",
        description: editProduct.description || "",
      });

      setPreview(editProduct.image);
    }
  }, [editProduct]);

  // =====================================
  // IMAGE HANDLE
  // =====================================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  // =====================================
  // INPUT CHANGE
  // =====================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // SUBMIT
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadData = new FormData();

      uploadData.append("name", formData.name);

      uploadData.append("category", formData.category);

      uploadData.append("price", formData.price);

      uploadData.append("brand", formData.brand);

      uploadData.append("stock", formData.stock);

      uploadData.append("status", formData.status);

      uploadData.append("description", formData.description);

      // IMAGE
      if (image) {
        uploadData.append("image", image);
      }

      // =================================
      // UPDATE PRODUCT
      // =================================
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/products/${editProduct._id}`,
          uploadData,
          {
            withCredentials: true,
          },
        );

        alert("Product Updated Successfully 🚀");
      } else {
        // =================================
        // ADD PRODUCT
        // =================================
        await axios.post("http://localhost:5000/api/products/add", uploadData, {
          withCredentials: true,
        });

        alert("Product Added Successfully 🚀");
      }

      // =================================
      // REDIRECT
      // =================================
      navigate("/client/products");
    } catch (err) {
      console.log(err);

      alert("Error saving product");
    }
  };

  return (
    <div className="add-product-page">
      {/* HEADER */}
      <div className="add-product-header">
        <h2>{isEdit ? "Edit Product" : "Add New Product"}</h2>

        <p>
          {isEdit
            ? "Update product details"
            : "Create and manage your store products easily."}
        </p>
      </div>

      {/* FORM */}
      <div className="add-product-card">
        <form className="product-form" onSubmit={handleSubmit}>
          {/* IMAGE */}
          <div className="image-upload-box">
            <label htmlFor="imageUpload" className="upload-label">
              {preview ? (
                <img src={preview} alt="preview" className="preview-image" />
              ) : (
                <>
                  <FaCloudUploadAlt className="upload-icon" />
                  <p>Upload Products Image</p>
                </>
              )}
            </label>

            <input type="file" id="imageUpload" hidden onChange={handleImage} />
          </div>

          {/* FORM GRID */}
          <div className="form-grid">
            {/* PRODUCT NAME */}
            <div className="form-group">
              <label>
                <FaBox /> Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            {/* CATEGORY */}
            <div className="form-group">
              <label>
                <FaLayerGroup /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* PRICE */}
            <div className="form-group">
              <label>
                <FaDollarSign /> Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            {/* BRAND */}
            <div className="form-group">
              <label>
                <FaTag /> Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
                required
              />
            </div>

            {/* STOCK */}
            <div className="form-group">
              <label>
                <FaClipboardList /> Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Available stock"
                required
              />
            </div>

            {/* STATUS */}
            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option>In Stock</option>

                <option>Out Of Stock</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="form-group description-group">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write product description..."
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/client/products")}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {isEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
