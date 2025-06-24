import React from 'react';
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={`${styles['footerContainer']} text-light pt-5 pb-3`}>
      <div className="container">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-12 col-md-3 text-center">
            <h5 className="fw-bold">EasyBuy</h5>
            <p className="">Your one-stop shop for everything amazing.</p>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 text-center">
            <h6 className="fw-semibold mb-3 ">Quick Links</h6>
            <ul className="list-unstyled ">
              <li><a href="#" className="text-light text-decoration-none ">Home</a></li>
              <li><a href="#" className="text-light text-decoration-none ">Shop</a></li>
              <li><a href="#" className="text-light text-decoration-none ">About Us</a></li>
              <li><a href="#" className="text-light text-decoration-none ">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-12 col-md-3 text-center">
            <h6 className="fw-semibold mb-3 ">Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">FAQs</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping & Returns</a></li>
              <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
              <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
            </ul>
          </div>

          {/* Socials */}
          <div className="col-12 col-md-3 text-center">
            <h6 className="fw-semibold mb-3">Follow Us</h6>
            <div className="d-flex justify-content-center gap-3 fs-5">
              <a href="#" className="text-light"><img src="/images/facebook-icon.png" alt="" /></a>
              <a href="#" className="text-light"><img src="/images/instagram-icon.png" alt="" /></a>
              <a href="#" className="text-light"><img src="/images/twitter-icon.png" alt="" /></a>
              <a href="#" className="text-light"><img src="/images/youtube-icon.png" alt="" /></a>
            </div>
          </div>
        </div>

        <hr className="border-light my-4" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} EasyBuy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
