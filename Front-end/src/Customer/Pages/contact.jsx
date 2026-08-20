import React, { useState } from "react";
import "./contact.css";

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

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Message Sent Successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>

      <section
        id="contact"
        className="contact-section d-flex flex-column justify-content-center align-items-center text-white text-center position-relative"
      >

        <div className="glow-circle glow-1" />
        <div className="glow-circle glow-2" />

        <FloatingLeaves />

        <div className="container">

          <div className="row align-items-center flex-column-reverse flex-lg-row">

            {/* TEXT */}
            <div className="col-lg-6 text-center text-lg-start"></div>

            <div className="col-lg-6 text-center text-lg-start">

              <h1 className="fw-bold mb-4">Contact Us</h1>

              <p>
                We’re always here to help you with your skincare and beauty needs.
                Whether you have questions about our products, orders, or skincare recommendations,
                feel free to reach out to us anytime.
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
      <section className="py-5" style={{ backgroundColor: "#fcdce5" }}>

  <div className="container">

    {/* CONTACT INFO CARDS */}
    <div className="row mb-5 g-4">

      {/* PHONE */}
      <div className="col-md-4">

        <div className="info-card text-center p-4 shadow-sm h-100">

          <div className="info-icon">
            📞
          </div>

          <h5 className="mt-3">Phone</h5>

          <p>
            +91 98765 43210
          </p>

        </div>

      </div>

      {/* EMAIL */}
      <div className="col-md-4">

        <div className="info-card text-center p-4 shadow-sm h-100">

          <div className="info-icon">
            📧
          </div>

          <h5 className="mt-3">Email</h5>

          <p>
            support@shasa.com
          </p>

        </div>

      </div>

      {/* ADDRESS */}
      <div className="col-md-4">

        <div className="info-card text-center p-4 shadow-sm h-100">

          <div className="info-icon">
            📍
          </div>

          <h5 className="mt-3">Address</h5>

          <p>
            Chennai, Tamil Nadu, India
          </p>

        </div>

      </div>

    </div>

    </div>

    
</section>

      {/* CONTACT FORM SECTION */}
<section className="py-5" style={{ backgroundColor: "#fcdce5" }}>

  <div className="container">

    <div className="row g-4 align-items-stretch">

      {/* FORM */}
      <div className="col-lg-6">

        <div className="contact-form-card p-4 p-md-5 shadow h-100">

          <h2 className="text-center mb-3">
            Get In Touch
          </h2>

          <p className="text-center mb-4">
            We'd love to hear from you. Send us your questions,
            feedback, or skincare inquiries anytime.
          </p>

          <form onSubmit={handleSubmit}>

            {/* NAME + EMAIL */}
            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-control custom-input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="form-control custom-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            {/* SUBJECT */}
            <div className="mb-3">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="form-control custom-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            {/* MESSAGE */}
            <div className="mb-4">
              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                className="form-control custom-input"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* BUTTON */}
            <div className="text-center">
              <button type="submit" className="send-btn">
                Send Message
              </button>
            </div>

          </form>

        </div>

      </div>

      {/* GOOGLE MAP */}
      <div className="col-lg-6">

        <div className="map-card shadow h-100">

          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.219226950801!2d77.2410!3d10.1010!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b079d4b6f3d9c1f%3A0x7b2f5f4b7f5b9f4f!2sTheni%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="map-frame"
          ></iframe>

        </div>

      </div>

    </div>

  </div>

</section>

    </>
  );
};

export default Contact;