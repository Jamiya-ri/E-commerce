import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./product.css";
import Productgirl from '../assets/pro.jpg';


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

const Products = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProducts();
}, []);
  return (
    <>

      {/* HERO SECTION */}
      <section className="product-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative">

        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">

          <div className="row align-items-center flex-column-reverse flex-lg-row">

            {/* TEXT */}


            <div className="col-lg-6 text-center mb-4 mb-lg-0">

            </div>
            <div className="col-lg-6 text-center text-lg-start">

              <h1 className="fw-bold mb-4">Products</h1>

              <p>
                Discover skincare and makeup products crafted with gentle,
                skin-loving ingredients. From daily essentials to beauty
                favorites, Shasa products are designed to nourish,
                protect, and enhance your natural glow every day.
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

      {/* SECOND SECTION */}
      <section className="py-5" style={{ background: "#fcdce5" }}>

        <div className="container">

          <div className="row align-items-center">

            {/* LEFT CONTENT */}
            <div className="col-lg-6 mb-4 mb-lg-0">

              <h2 className="fw-bold mb-4">
                Shasa Products
              </h2>

              <p>
                Shasa products are created with a perfect blend of
                natural ingredients and modern beauty care.
              </p>

              <p>
                Our skincare and makeup range is designed to nourish
                the skin, enhance natural beauty, and provide gentle
                care for every skin type.
              </p>

              <p>
                From hydration to glow, every Shasa product is made
                to deliver quality, comfort, and confidence in your
                daily beauty routine.
              </p>

              {/* BUTTON */}
              <Link to="/about" className="btn btn-dark px-4 py-2 mt-3">
                About Us
              </Link>

            </div>

            {/* RIGHT IMAGES */}
            <div className="col-lg-6">

             
                  <img
                    src={Productgirl} alt="product"
                    className="img-fluid rounded shadow customerproduct-img"
                  />
                </div>

                
          </div>

        </div>

      </section>
<section className="category-section py-5">

  <div className="container">

    <div className="text-center mb-5">

      <h2 className="category-title">
        Explore Our Collections
      </h2>

      <p className="category-subtitle">
        Discover premium skincare and makeup products
        designed to nourish your beauty naturally.
      </p>

    </div>

    <div className="row g-4">

      {products.map((product) => (

        <div
          className="col-lg-3 col-md-4 col-sm-6"
          key={product._id}
        >

          <div className="card h-100 shadow border-0 product-card">

            <img
              src={product.image}
              alt={product.name}
              className="card-img-top"
              style={{
                height: "250px",
                objectFit: "cover"
              }}
            />

            <div className="card-body d-flex flex-column">

              <h5 className="card-title">
                {product.name}
              </h5>

              <p className="text-muted small">
                {product.category}
              </p>

              <p className="card-text flex-grow-1">
                {product.description?.slice(0, 80)}...
              </p>

              <h6 className="fw-bold mb-3">
                ₹{product.price}
              </h6>

              <Link
                to={`/product/${product._id}`}
                className="btn btn-dark w-100"
              >
                View Product
              </Link>

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

export default Products;