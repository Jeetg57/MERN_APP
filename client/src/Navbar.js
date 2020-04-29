import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery.slim";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.checkAuth();
  }
  checkAuth = () => {
    if (
      localStorage.getItem("auth-token") !== null &&
      localStorage.getItem("expiry") > Math.floor(Date.now() / 1000)
    ) {
      this.setState(() => ({ isAuthenticated: true }));
    }
  };
  logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("expiry");
    this.checkAuth();
    window.location = "/";
  };
  render() {
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
                {this.state.isAuthenticated === true && (
                  <li className="nav-item">
                    <Link to="/upload" className="nav-link">
                      Upload Image{" "}
                    </Link>
                  </li>
                )}
                {this.state.isAuthenticated === true && (
                  <li className="nav-item">
                    <Link to="/results" className="nav-link">
                      All Results
                    </Link>
                  </li>
                )}
                {this.state.isAuthenticated === true && (
                  <li className="nav-item">
                    <Link to="/ocr" className="nav-link">
                      OCR
                    </Link>
                  </li>
                )}
                {this.state.isAuthenticated === true && (
                  <li className="nav-item">
                    <Link to="/chart" className="nav-link">
                      Charts
                    </Link>
                  </li>
                )}
                {this.state.isAuthenticated === false && (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                )}
                {this.state.isAuthenticated === true && (
                  <li className="nav-item">
                    <button
                      onClick={this.logout}
                      className="nav-link btn btn-link"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
