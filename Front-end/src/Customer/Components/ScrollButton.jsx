import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scrollbutton.css";

const ScrollButton = () => {

  const [show, setShow] = useState(false);

  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }

    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);

  }, []);

  const scrollTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (
    <button
      className={`scroll-btn ${show ? "active" : ""}`}
      onClick={scrollTop}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollButton;