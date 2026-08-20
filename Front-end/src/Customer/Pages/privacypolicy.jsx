import React from "react";
import { FaLock, FaUserShield, FaDatabase, FaShieldAlt } from "react-icons/fa";
import "./privacypolicy.css";

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

const PrivacyPolicy = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="privacy-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative">

        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">
          <h1 className="fw-bold">
                          <FaLock style={{ marginRight: "10px", color: "#ff69b4" }} />
Privacy Policy</h1>
          <p>
            Your privacy is important to us. This page explains how we collect, use, and protect your information.
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

          {/* Card 1 */}
          <div className="card p-4 shadow-sm mb-3">
            <h5>
              <FaLock style={{ marginRight: "8px", color: "#ff69b4" }} />
              Data Protection
            </h5>
            <p>
              We ensure that all personal data is securely stored and protected using industry-standard security measures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card p-4 shadow-sm mb-3">
            <h5>
              <FaUserShield style={{ marginRight: "8px", color: "blue" }} />
              Information Collection
            </h5>
            <p>
              We collect basic details such as name, email, phone number, and address for order processing.
            </p>
          </div>

          {/* ROW SECTION */}
          <div className="row align-items-center mb-3">

            {/* IMAGE */}
            <div className="col-md-6 mb-3 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
                alt="data security"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* TEXT */}
            <div className="col-md-6">
              <div className="card p-4 shadow-sm">
                <h5>
                  <FaDatabase style={{ marginRight: "8px", color: "orange" }} />
                  Data Usage
                </h5>
                <p>
                  Your data helps us improve our services and customer experience. We never sell your data.
                </p>
              </div>
            </div>

          </div>

          {/* FINAL CARD */}
          <div className="card p-4 shadow-sm">
            <h5>
              <FaShieldAlt style={{ marginRight: "8px", color: "green" }} />
              Security
            </h5>
            <p>
              We use secure payment systems and encryption to protect your personal information.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;