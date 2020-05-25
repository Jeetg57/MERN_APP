import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "jquery/dist/jquery.slim";
import Axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      name: null,
      job_title: null,
      id: null,
      message: null,
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.checkAuth();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name === prevState.name) {
      this.getUser();
    }
  }

  getUser = async () => {
    if (this.state.isAuthenticated === true) {
      const id = localStorage.getItem("id");
      Axios.get(`/users/others/${id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
        .then((response) => {
          this.setState(() => ({
            name: response.data.username,
            job_title: response.data.job_title,
            id: response.data._id,
          }));
        })
        .catch((err) => {
          this.setState(() => ({ message: err.response.data }));
        });
    }
  };
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
        <nav className="navbar navbar-dark bg-dark navbar-expand-md myNavbar">
          <div className="container">
            <a href="/" className="navbar-brand">
              <AiFillHome
                className="mr-2"
                style={{ fontSize: "24px" }}
              ></AiFillHome>
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
                {this.state.isAuthenticated === true &&
                  this.state.job_title !== "Registrant" && (
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  )}
                {this.state.isAuthenticated === true &&
                  (this.state.job_title === "Admin" ||
                    this.state.job_title === "Registrant" ||
                    this.state.job_title === "Doctor") && (
                    <li className="nav-item">
                      <Link to="/details/upload" className="nav-link">
                        Baby Details Input
                      </Link>
                    </li>
                  )}
                {this.state.isAuthenticated === true &&
                  (this.state.job_title === "Admin" ||
                    this.state.job_title === "Registrant" ||
                    this.state.job_title === "Doctor") && (
                    <li className="nav-item">
                      <Link to="/babyRegistration" className="nav-link">
                        Baby Registration
                      </Link>
                    </li>
                  )}
                {this.state.isAuthenticated === true &&
                  (this.state.job_title === "Admin" ||
                    this.state.job_title === "Registrant") && (
                    <li className="nav-item">
                      <Link to="/ocr" className="nav-link">
                        OCR
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

                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About us
                  </Link>
                </li>

                {this.state.isAuthenticated === true && (
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FaUserCircle style={{ marginRight: "7px" }} />
                      {this.state.name}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <ul className="navbar nav">
                        <li className="dropdown-item">
                          <Link to="/user/profile" className="dropdown-item">
                            My Profile
                          </Link>
                        </li>
                        <li className="dropdown-item">
                          <a
                            href="/"
                            onClick={this.logout}
                            className="dropdown-item"
                            style={{ cursor: "pointer" }}
                          >
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
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
