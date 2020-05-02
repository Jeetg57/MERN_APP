import React, { Component } from "react";
import "./userDetail.css";
import axios from "axios";
import { FaSignOutAlt } from "react-icons/fa";
class UserDetail extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      userData: null,
      message: "",
    };
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("expiry");
    localStorage.removeItem("id");
    window.location = "/";
  };
  getUser = async () => {
    const id = localStorage.getItem("id");
    axios
      .get(`/users/${id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        this.setState(() => ({
          userData: response.data,
        }));
      })
      .catch((err) => {
        this.setState(() => ({ message: err.response.data }));
      });
  };
  render() {
    if (this.state.userData !== null && this.state.message.length === 0) {
      return (
        <div className="container">
          <div className="">
            <div className="">
              <div className="div-box">
                <div className="User-img">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
                    alt="profile"
                  ></img>
                </div>
                <h3 className="User-name">
                  {this.state.userData.firstname} {this.state.userData.lastname}
                </h3>
                <h4 className="designation">{this.state.userData.job_title}</h4>
                <h5 className="designation">{this.state.userData.gender}</h5>
                <div className="info">
                  <ul>
                    <li>Address: {this.state.userData.address}</li>
                    <li>
                      Email:{" "}
                      <a
                        href={`mailto:${this.state.userData.email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {this.state.userData.email}
                      </a>
                    </li>
                    <li>UserName: {this.state.userData.username}</li>
                    <li>Phone: {this.state.userData.phone}</li>
                  </ul>
                </div>
                <div className="profile-details">
                  <ul>
                    <li>
                      <a href={`/user/edit/${localStorage.getItem("id")}`}>
                        <i className="fas fa-flag"></i> Edit Profile
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="text-right">
                  <button className="btn btn-dark" onClick={this.logout}>
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.message.length > 0) {
      return (
        <div className="container">
          <div className="bar error">{this.state.message}</div>
          <h3>
            Your login has expired. Click <a href="/login">here</a> to login
            again
          </h3>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default UserDetail;
