import { FaYoutube } from "react-icons/fa6";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-content">
          <h2>E-Learning Platform</h2>
          <p className="contact-list">
            <b>Phone:</b> 078662447973
            <br />
            <b>Email:</b> phamxuantrung02122003@gmail.com
            <br />
            <b>Address:</b> 25B, road 10, Binh Trung Tay, Ho Chi Minh city
            <br />
            &copy; 2024 - 2030 Top online learning platform in Viet Nam
          </p>
        </div>
        <div className="footer-icons">
          <a
            href="https://www.youtube.com/@nhat4547"
            className="social-item social-item-red"
            aria-label="Youtube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.facebook.com/xuantrung.pham.313371"
            className="social-item social-item-blue"
            aria-label="Facebook"
          >
            <IoLogoFacebook />
          </a>
          <a
            href="#"
            className="social-item social-item-white"
            aria-label="Twitter"
          >
            <AiFillTwitterSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
