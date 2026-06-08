import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product Not Found</h3>
      </div>
    );
  }
// =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (productId) => {

    try {

      await axios.post(

        "http://localhost:5000/api/cart/add",

        {
          productId,
        },

        {
          withCredentials: true,
        }
      );

      alert("Added to cart 🛒");

    } catch (err) {

      console.log(err);

      if (err.response?.status === 401) {

        alert("Please login first");

      } else {

        alert("Cart failed");

      }

    }

  };

  // =========================
  // ADD TO WISHLIST
  // =========================
  const handleWishlist = async (productId) => {

    try {

      await axios.post(

        "http://localhost:5000/api/wishlist/add",

        {
          productId,
        },

        {
          withCredentials: true,
        }
      );

      alert("Added to wishlist ❤️");

    } catch (err) {

      console.log(err);

      if (err.response?.status === 401) {

        alert("Please login first");

      } else {

        alert(
          err.response?.data?.message || "Wishlist failed"
        );

      }

    }

  };

  return (
    <div className="container py-5 mt-5">

      <div className="row g-5">

        {/* IMAGE */}
        <div className="col-lg-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              width: "100%",
              maxHeight: "600px",
              objectFit: "cover"
            }}
          />
        </div>

        {/* DETAILS */}
        <div className="col-lg-6">

          <h2 className="fw-bold mb-3">
            {product.name}
          </h2>

          <p className="text-muted">
            Category: {product.category}
          </p>

          <p>
            <strong>Brand:</strong> {product.brand}
          </p>

          <h3 className="text-success mb-3">
            ₹{product.price}
          </h3>

          <p>
            <strong>Available Stock:</strong>{" "}
            {product.stock}
          </p>

          <p>
            <strong>ShopName:</strong>{" "}
            {product.shopName || "Shasa"}
          </p>

          <hr />

          <h5>Description</h5>

          <p>{product.description}</p>

          <div className="d-flex gap-3 mt-4">

        <button
                      className="skincart-btn"
                      onClick={() =>
                        handleAddToCart(product._id)
                      }
                    >

                      <FaShoppingCart />

                      Add To Cart

                    </button>

           <button
                      className="skincart-btn"
                      onClick={() =>
                        handleWishlist(product._id)
                      }
                    >

                      <FaHeart />

                      Add to Wishlist

                    </button>

          </div>

          <Link
            to="/products"
            className="btn btn-secondary mt-4"
          >
            Back To Products
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;