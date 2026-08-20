import React from "react";
import "./refundpolicy.css";

import {
  FaUndo,
  FaCheckCircle,
  FaHeadset,
  FaClipboardList,
  FaBoxOpen,
  FaClock
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

const RefundPolicy = () => {
  return (
    <div>

      {/* HERO SECTION */}
      <section className="refund-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative">

        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">
          <h1 className="fw-bold">
            <FaUndo style={{ marginRight: "10px",color:"#ff69b4" }} />
            Refund Policy
          </h1>
          <p>
            We ensure a smooth and transparent refund process for all eligible orders.
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

      {/* CONTENT */}
      <section className="py-5" style={{ backgroundColor: "#fcdce5" }}>
        <div className="container">

          {/* Eligibility */}
          <div className="card p-4 shadow-sm mb-3">
            <h5>
              <FaCheckCircle style={{ marginRight: "8px", color: "green" }} />
              Refund Eligibility
            </h5>
            <p>
              Refunds are available only for damaged, wrong, or defective products.
              Requests must be made within 3 days of delivery.
            </p>
          </div>

          {/* ROW SECTION */}
          <div className="row align-items-center mb-4">

            {/* STEPS */}
            <div className="col-md-6 mb-3 mb-md-0">
              <div className="card p-4 shadow-sm">
                <h5>
                  <FaClipboardList style={{ marginRight: "8px", color: "#ff69b4" }} />
                  How to Request Refund
                </h5>

                <p>
                  Contact our support team with your order details and proof.
                </p>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>

                  <li>
                    <FaHeadset style={{ marginRight: "8px", color: "blue" }} />
                    Contact support team
                  </li>

                  <li>
                    <FaBoxOpen style={{ marginRight: "8px", color: "orange" }} />
                    Share product proof
                  </li>

                  <li>
                    <FaCheckCircle style={{ marginRight: "8px", color: "green" }} />
                    Verification process
                  </li>

                  <li>
                    <FaClock style={{ marginRight: "8px", color: "purple" }} />
                    Refund in 7–10 days
                  </li>

                </ul>

              </div>
            </div>

            {/* IMAGE */}
            <div className="col-md-6 text-center">
              <img
                src="https://t3.ftcdn.net/jpg/08/39/22/48/360_F_839224823_pNe539BJqC5De4Vh9hZa8sljWW0KqXRm.jpg"
                alt="refund process"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>

          {/* FINAL NOTE */}
          <div className="card p-4 shadow-sm">
            <h5>
              <FaUndo style={{ marginRight: "8px", color: "red" }} />
              Important Notes
            </h5>
            <p>
              Shipping charges are non-refundable. Used or opened products are not eligible for refund.
              We reserve the right to reject refund requests if conditions are not met.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default RefundPolicy;