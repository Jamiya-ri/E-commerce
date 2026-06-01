import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import './home.css';
import Footer from "../components/footer";
import FloatingAura from "../components/FloatingAura";
import FaceFloat from "../components/FaceFloat";


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

const Home = () => {
    return (
        <>
            {/* Section 1: Hero */}
            <section
                id="home"
                className="hero-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative"
            >
                {/* Aura glow effects */}
                <div className="glow-circle glow-1" />
                <div className="glow-circle glow-2" />

                {/* Floating pastel pink leaves */}
                 <FloatingLeaves/>

                {/* Hero Text */}
                <div className="container">
                    
                    <div className="row align-items-center flex-column-reverse flex-lg-row">
                    <div className="col-lg-6 text-center mb-4 mb-lg-0">
                            <FaceFloat />
                        </div>
                        <div className="col-lg-6 text-center text-lg-start">
                            <h2 className="fw-bold mb-4">Welcome to Shasa</h2>
                            <p>
                                Shasa Skincare is inspired by nature and powered by science.
                                Our products are gentle, effective, and designed for all skin types.
                            </p>
                            <p>
                                With nourishing botanicals and clean ingredients,
                                we bring out your natural radiance.
                            </p>
                        </div>
                       
                    </div>
                </div>

                {/* Wavy divider */}
                <div className="wave-divider">
                    <svg
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#fcdce5"
                            d="M0,160 C360,240 1080,80 1440,160 L1440,320 L0,320 Z"
                        />
                    </svg>
                </div>
            </section>

            {/* Section 2: About */}
            <section className="py-5 text-center" style={{ backgroundColor: "#fcdce5" }}>
    
    <div className="container">

        {/* Title */}
        <h2 className="fw-bold mb-3" style={{ fontFamily: "Dancing Script, cursive" }}>
            Why Choose Shasa?
        </h2>

        {/* Subtitle */}
        <p className="mx-auto" style={{ maxWidth: "600px", fontSize: "1.1rem", lineHeight: "1.6" }}>
            At Shasa, we combine the purity of nature with the power of science to create skincare 
            that is gentle, effective, and made for real results. Our products are designed to 
            nourish your skin and enhance your natural beauty every day.
        </p>

    </div>
    <FloatingAura/>
    
   
  

</section>
        </>
    );
};

export default Home;
