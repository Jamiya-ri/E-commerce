
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ScrollButton from "../components/ScrollButton";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
  return (
    <>
      <ScrollButton />
      <ScrollToTop />

      {/* 🔥 USER PASSED TO NAVBAR */}
      <Navbar/>

      <div className="Customermain-content">
        <Outlet />
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
