import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery.slim";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <div className="container">
          <a href="/" className="navbar-brand">
            Dell Project
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar-list-2"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbar-list-2"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/upload" className="nav-link">
                  Upload Image{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/results" className="nav-link">
                  All Results
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/ocr" className="nav-link">
                  OCR
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/chart" className="nav-link">
                  Charts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
