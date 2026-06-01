import React from "react";
import "./about.css";
import Testimonials from "../components/testimonial";

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

const About = () => {
  return (
    <>
      <section
        id="about"
        className="about-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative"
      >
        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">
          <div className="row align-items-center flex-column-reverse flex-lg-row">
            {/* TEXT */}
            <div className="col-lg-6 text-center text-lg-start"></div>
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="fw-bold mb-4">About Us</h1>

              <p>
                Shasa Skincare & Makeup is dedicated to enhancing natural beauty
                with safe, effective, and skin-loving products. We believe in
                combining nature-inspired ingredients with modern beauty science
                to deliver results you can trust. Our range is designed for all
                skin types, helping you achieve a healthy glow with confidence
                every day. At Shasa, beauty is simple, gentle, and made for
                everyone.
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

      {/* CONTENT SECTION */}
      <section className="py-5" style={{ backgroundColor: "#fcdce5" }}>
        <div className="container text-center">
          <h3>🌿 ✨ Our Story</h3>

          <p>
            Shasa Skincare & Makeup began with a simple vision — to create
            beauty products that are safe, gentle, and inspired by nature. We
            started our journey with the belief that skincare should not only
            enhance beauty but also care for the skin from within.
          </p>

          <p>
            What began as a small idea has grown into a brand focused on
            quality, trust, and natural ingredients. Every product is carefully
            designed to suit all skin types, ensuring effective results without
            compromising skin health.
          </p>

          <p>
            At Shasa, we combine traditional natural ingredients with modern
            skincare science to deliver products that help you feel confident in
            your own skin. Our story is built on passion, care, and the desire
            to bring out the natural glow in everyone.
          </p>
        </div>
      </section>
      {/* KEY INGREDIENTS FLIP CARDS */}
      <section className="py-5" style={{ background: "#fcdce5" }}>
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Key Ingredients</h2>

            <p>Natural ingredients used in Shasa skincare products.</p>
          </div>

          <div className="row g-4">
            {/* ALOE VERA */}
            <div className="col-md-6 col-lg-3">
              <div className="flip-card">
                <div className="flip-card-inner">
                  {/* FRONT */}
                  <div className="flip-card-front">
                    <img
                      src="https://www.realsimple.com/thmb/GGYcb-pI-OzJGHuT2ADPqlDc9Ds=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/aloe-vera-skincare-for-face-GettyImages-1440183163-226198cc1c394ec6a4d64e0984d7914f.jpg"
                      alt="Aloe Vera"
                      className="img-fluid"
                    />
                  </div>

                  {/* BACK */}
                  <div className="flip-card-back">
                    <h4>🌿 Aloe Vera</h4>

                    <p>Hydrates and soothes the skin naturally.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TURMERIC */}
            <div className="col-md-6 col-lg-3">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="https://smytten.com/blogs/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Fsmyttenshop%2Fblogimages%2F7-turmeric-face-pack-secrets-for-radiant-skin-84008834-412d-4fe0-ba5f-b0791cbff6bc.webp&w=3840&q=75"
                      alt="Turmeric"
                      className="img-fluid"
                    />
                  </div>

                  <div className="flip-card-back">
                    <h4>✨ Turmeric</h4>

                    <p>Brightens skin and reduces dullness.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* OLIVE OIL */}
            <div className="col-md-6 col-lg-3">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800&auto=format&fit=crop"
                      alt="Olive Oil"
                      className="img-fluid"
                    />
                  </div>

                  <div className="flip-card-back">
                    <h4> Olive Oil</h4>

                    <p>Moisturizes and keeps skin soft.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SHEA BUTTER */}
            <div className="col-md-6 col-lg-3">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src="https://png.pngtree.com/thumb_back/fh260/background/20221120/pngtree-shea-butter-and-nuts-in-bowl-wellness-shea-butter-product-photo-image_4499906.jpg"
                      alt="Shea Butter"
                      className="img-fluid"
                    />
                  </div>

                  <div className="flip-card-back">
                    <h4>🧴 Shea Butter</h4>

                    <p>Nourishes and repairs dry skin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};

export default About;
