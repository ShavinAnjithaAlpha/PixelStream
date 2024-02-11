import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-col">
          <h3>PhotoStock</h3>
          <p>
            PhotoStock is a platform to share and download high quality photos
            for free. We are a community of photographers who loves to share
            their work with the world.
          </p>
          <div className="social-media">
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} size="2xl" className="icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} size="2xl" className="icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faYoutube} size="2xl" className="icon" />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faTwitter} size="2xl" className="icon" />
            </a>
          </div>
        </div>
        <div className="footer-col">
          <h3>Section</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Signup</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Legal</h3>
          <ul>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <h3>Subscribe</h3>
          <p>
            Subscribe to our newsletter to get the latest news, updates and
            special offers delivered directly in your inbox.
          </p>
          <form action="">
            <div className="input-box">
              <input type="email" placeholder="Enter email" />
              <button type="submit">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer-line">
        <p>&copy; 2024 PhotoStock | All Right Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
