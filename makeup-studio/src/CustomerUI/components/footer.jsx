import React from "react";
import './footer.css';
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="py-5" style={{ backgroundColor: "black", color: "white" }}>
            <div className="container">
                <div className="row align-items-start">

                    {/* Left */}
                    <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
                        <h3 style={{ fontFamily: "'Dancing Script', cursive" }}>
                            Shasa
                        </h3>
                        <p style={{ maxWidth: "400px" }}>
                            Discover the beauty of natural skincare with Shasa.
                            We create gentle, effective products that bring out your natural glow.
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="col-md-4 text-center mb-4 mb-md-0">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="#!" className="social-icon" style={{ color: "pink", marginRight: "10px" }}>
                                <FaFacebook />
                            </a>
                            <a href="#!" className="social-icon" style={{ color: "pink", marginRight: "10px" }}>
                                <FaInstagram />
                            </a>
                            <a href="#!" className="social-icon" style={{ color: "pink" }}>
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Policy Links (PAGE NAVIGATION) */}
                    <div className="col-md-4 text-center text-md-end">
                        <h5>Policies</h5>

                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                            <Link to="/privacy-policy" style={{ color: "pink", textDecoration: "none" }}>
                                Privacy Policy
                            </Link>

                            <Link to="/refund-policy" style={{ color: "pink", textDecoration: "none" }}>
                                Refund Policy
                            </Link>

                            <Link to="/terms-conditions" style={{ color: "pink", textDecoration: "none" }}>
                                Terms & Conditions
                            </Link>

                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="text-center mt-4" style={{ fontSize: "0.9rem" }}>
                    © {new Date().getFullYear()} Shasa. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;