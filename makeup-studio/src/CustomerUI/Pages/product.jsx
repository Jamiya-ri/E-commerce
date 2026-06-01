import React from "react";
import { Link } from "react-router-dom";
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
<section className="category-section">

  <div className="container">

    {/* TITLE */}
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

      {/* SKINCARE */}
      <div className="col-lg-6">

        <div className="category-card">

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsEmYyakXszXGmeum4x2PFvqpsLb6tU4CrQg&s"           alt="skincare"
            className="category-img"
          />

          <div className="category-overlay">

            <h3>Skincare</h3>

            <p>
              Gentle skincare essentials for healthy,
              glowing, and naturally radiant skin.
            </p>

            <Link
              to="/products/skincare"
              className="btn"
            >
              View Skincare
            </Link>

          </div>

        </div>

      </div>

      {/* MAKEUP */}
      <div className="col-lg-6">

        <div className="category-card">

          <img
            src="https://png.pngtree.com/background/20230427/original/pngtree-many-different-types-of-makeup-products-on-a-black-background-picture-image_2495945.jpg"           alt="makeup"
            className="category-img"
          />

          <div className="category-overlay">

            <h3>Makeup</h3>

            <p>
              Elegant makeup products crafted for
              everyday beauty and confidence.
            </p>

            <Link
              to="/products/makeup"
              className="btn"
            >
              View Makeup
            </Link>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
    </>
  );
};

export default Products;