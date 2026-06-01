import React, { useEffect, useState } from "react";
import axios from "axios";
import "./skincare.css";
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

const Skincare = () => {
  const [products, setProducts] = useState([]);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products?category=skincare",
        );

        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (productId) => {
    try {
      // CHECK LOGIN
      if (!window.token) {
        alert("Please login first");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/cart/add",

        {
          productId,
        },

        {
          headers: {
            authorization: window.token,
          },
        },
      );

      alert("Added to cart 🛒");
    } catch (err) {
      console.log(err);

      alert("Cart failed");
    }
  };

  const handleWishlist = async (productId) => {
  try {
    await axios.post(
      "http://localhost:5000/api/wishlist/add",

      {
        productId,
      },

      {
        headers: {
          authorization:
            window.token,
        },
      }
    );

    alert(
      "Added to wishlist ❤️"
    );

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message
    );

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
              <h1 className="fw-bold mb-4">Skincare Collection</h1>

              <p>
                Discover premium beauty essentials crafted to enhance your
                natural glow with elegance and confidence every day.
              </p>
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
            <h2 className="fw-bold">Featured Skincare Products</h2>

            <p>Beauty products designed to make you glow naturally.</p>
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

                    <button className="skinwishlist-btn" 
                     onClick={() => handleWishlist(product._id) }>
                      <FaHeart />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="skinproduct-content">
                    <div>
                      <h3>{product.brand}</h3>
                    </div>

                    <h5>{product.name}</h5>

                    <p className="skinprice">₹{product.price}</p>

                    {/* ADD TO CART */}
                    <button
                      className="skincart-btn"
                      onClick={() => handleAddToCart(product._id)}
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

export default Skincare;
