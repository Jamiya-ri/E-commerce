import React from "react";
import "./termsandconditions.css";

import {
  FaFileContract,
  FaShoppingCart,
  FaUserShield,
  FaExclamationTriangle,
  FaCheckCircle,
  FaShieldAlt,
  FaBalanceScale
} from "react-icons/fa";

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

const TermsConditions = () => {
  return (
    
    <div>

      {/* HERO SECTION */}
      <section className="terms-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative">

        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">
          <h1 className="fw-bold">
            <FaFileContract style={{ marginRight: "10px" ,color:"#ff69b4" }} />
            Terms & Conditions
          </h1>
          <p>
            Please read our terms carefully before using Shasa Skincare website.
          </p>
        </div>

        <div className="wave-divider">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#fcdce5"
              d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>

      </section>

      {/* CONTENT SECTION */}
      <section className="py-5" style={{ backgroundColor: "#fcdce5" }}>
        <div className="container">

          {/* Section 1 */}
          <div className="card p-4 shadow-sm mb-3">
            <h5>
              <FaUserShield style={{ marginRight: "8px", color: "green" }} />
              Website Usage
            </h5>
            <p>
              This website is intended for personal shopping and informational purposes only.
              Any misuse or unauthorized access is strictly prohibited.
            </p>
          </div>

          {/* ROW SECTION */}
          <div className="row align-items-center mb-4">

            {/* TEXT */}
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="card p-4 shadow-sm">

                <h5>
                  <FaShoppingCart style={{ marginRight: "8px", color: "#ff69b4" }} />
                  Orders & Payments
                </h5>

                <p>
                  We reserve the right to cancel any order if suspicious activity is detected.
                  All payments must be completed through secure gateways.
                </p>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>

                  <li>
                    <FaBalanceScale style={{ marginRight: "8px", color: "blue" }} />
                    Prices may change anytime
                  </li>

                  <li>
                    <FaCheckCircle style={{ marginRight: "8px", color: "green" }} />
                    Orders can be accepted or rejected
                  </li>

                  <li>
                    <FaExclamationTriangle style={{ marginRight: "8px", color: "orange" }} />
                    Fraud orders will be blocked
                  </li>

                </ul>

              </div>
            </div>

            {/* IMAGE */}
            <div className="col-md-6 text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHU4qOR1C-D5AqLrgeEqp2V-buO5pWBcHUyA&s"
                alt="terms"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>

          {/* FINAL SECTION */}
          <div className="card p-4 shadow-sm">

            <h5>
              <FaShieldAlt style={{ marginRight: "8px", color: "red" }} />
              Liability & Responsibility
            </h5>

            <p>
              Shasa Skincare is not responsible for any allergic reactions.
              Customers are advised to check ingredients before use.
              We are not liable for misuse of products.
            </p>

          </div>

        </div>
      </section>

    </div>
  );
};

export default TermsConditions;