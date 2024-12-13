import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SideBar from "../components/sideBar/SideBar";
import { Outlet } from "react-router-dom";
import "../assets/css/Home_Layout.css";
import "../assets/css/dropdown.css";
import "../assets/css/card.css";
import "../assets/css/courseDetail.css";
import "../assets/css/Accordion.css";
import "../assets/css/cart.css";
import "../assets/css/NotificationPage.css";

const Home_Layout = () => {
  return (
    <>
      <Header />

      <section id="main-body">
        {/* <SideBar /> */}

        <Outlet />
      </section>

      <Footer />
    </>
  );
};

export default Home_Layout;
