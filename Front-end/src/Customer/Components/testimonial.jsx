import React, { useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import './testimonial.css';

const Testimonials = () => {
  useEffect(() => {
    const carousel = document.querySelector("#testimonialCarousel");

    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 3000,
        ride: "carousel",
        pause: false,
      });
    }
  }, []);

  return (
    <section className="testimonial-section py-5">

      <div className="container">

        <h2 className="text-center mb-4">
          <FaQuoteLeft style={{ marginRight: "10px", color: "#ff69b4" }} />
          Testimonials
        </h2>

        <div id="testimonialCarousel" className="carousel slide">

          <div className="carousel-inner">

            <div className="carousel-item active">
              <div className="glass-card text-center">
                <p>"Shasa made my skin glow naturally!"</p>
                <h6>— Priya S</h6>
              </div>
            </div>

            <div className="carousel-item">
              <div className="glass-card text-center">
                <p>"Best skincare I’ve ever used."</p>
                <h6>— Anjali R</h6>
              </div>
            </div>

            <div className="carousel-item">
              <div className="glass-card text-center">
                <p>"Highly recommend Shasa products."</p>
                <h6>— Meera K</h6>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonials;