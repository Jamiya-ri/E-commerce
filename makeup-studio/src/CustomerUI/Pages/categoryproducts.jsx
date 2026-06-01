import React, { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import { FaHeart, FaShoppingCart } from "react-icons/fa";

const FloatingLeaves = () => {
  const leaves = Array.from({ length: 8 });

  return (
    <div className="floating-leaves">
      {leaves.map((_, i) => (
        <div key={i} className={`leaf leaf-${i + 1}`} />
      ))}
    </div>
  );
};

const CategoryProducts = () => {

  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    fetchProducts();

  }, [category]);

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          withCredentials: true,
        }
      );

      // FILTER PRODUCTS
      const filteredProducts = res.data.filter(
        (item) => item.category === category
      );

      setProducts(filteredProducts);

    } catch (err) {

      console.log(err);

    }

  };

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
    <>
      {/* HERO SECTION */}
      <section className="skincare-hero d-flex flex-column justify-content-center align-items-center text-white text-center position-relative">

        <div className="glow-circle glow-1"></div>

        <div className="glow-circle glow-2"></div>

        <FloatingLeaves />

        <div className="container">

          <div className="row align-items-center">

            <div className="col-lg-6 text-center mt-5 mt-lg-0"></div>

            <div className="col-lg-6 text-white">

              <h1 className="fw-bold mb-4 text-capitalize">
  {category} Collection
</h1>


            </div>

          </div>

        </div>

        {/* WAVE */}
        <div className="wave-divider">

          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">

            <path
              fill="#fcdce5"
              d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
            />

          </svg>

        </div>

      </section>

      {/* PRODUCTS */}
      <section className="skincareproducts-section py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold text-capitalize">
  Featured {category} Products
</h2>

            
          </div>

          <div className="row g-4">

            {products.map((product) => (

              <div className="col-lg-3 col-md-6" key={product._id}>

                <div className="skinproduct-card">

                  {/* IMAGE */}
                  <div className="skinproduct-img-wrapper">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="skinproduct-img"
                    />

                    {/* WISHLIST */}
                    <button
                      className="skinwishlist-btn"
                      onClick={() =>
                        handleWishlist(product._id)
                      }
                    >

                      <FaHeart />

                    </button>

                  </div>

                  {/* CONTENT */}
                  <div className="skinproduct-content">

                    <div>

                      <h3>
                        {product.brand}
                      </h3>

                    </div>

                    <h5>
                      {product.name}
                    </h5>

                    <p className="skinprice">
                      ₹{product.price}
                    </p>

                    {/* ADD TO CART */}
                    <button
                      className="skincart-btn"
                      onClick={() =>
                        handleAddToCart(product._id)
                      }
                    >

                      <FaShoppingCart />

                      Add To Cart

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>
    </>
  );

};

export default CategoryProducts;