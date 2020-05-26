import React, { Component } from "react";
import baby from "../../assets/formLoadingBaby.gif";
const axios = require("axios");

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      loading: false,
      email: "",
      address: "",
      phone: "",
      job_title: "",
      gender: "",
      username: "",
      password: "",
      message: "",
      successMessage: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
      job_title: this.state.job_title,
      gender: this.state.gender,
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({ loading: true });
    axios
      .post("/user/register", data)
      .then((response) => {
        this.setState(() => ({
          successMessage: response.message,
          loading: false,
        }));
        setTimeout((window.location = "/signup/success"), 3000);
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data, loading: false }));
      });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div className="container">
          <img src={baby} alt="rollingbabyface"></img>
          <h1>Please wait while we register you</h1>
        </div>
      );
    } else {
      return (
        <div className="container vertical-center">
          <div className="login-form">
            <div>
              <h1 className="text-center">Sign-up</h1>
            </div>
            <form onSubmit={this.onFormSubmit}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    className="form-control"
                    onChange={(e) => this.onChange(e)}
                  ></input>
                </div>
                <div className="form-group col-md-6">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    className="form-control"
                    onChange={(e) => this.onChange(e)}
                  ></input>
                </div>
              </div>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                ></input>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="address"
                  className="form-control"
                  id="inputAddress2"
                  name="address"
                  onChange={(e) => this.onChange(e)}
                ></input>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Phone</label>
                  <input
                    type="phone"
                    name="phone"
                    className="form-control"
                    onChange={(e) => this.onChange(e)}
                  ></input>
                </div>
                <div className="form-group col-md-4">
                  <label>Job Title</label>
                  <select
                    id="inputState"
                    name="job_title"
                    onChange={(e) => this.onChange(e)}
                    className="form-control"
                  >
                    <option value="" defaultValue>
                      None
                    </option>
                    <option value="Administrator">Administrator</option>
                    <option value="Data Analyst">Data Analyst</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Registrant">Registrant</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label>Gender</label>
                  <select
                    id="inputStates"
                    name="gender"
                    onChange={(e) => this.onChange(e)}
                    className="form-control"
                  >
                    <option value="" defaultValue>
                      None
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputemail"
                      name="email"
                      placeholder="e.g. someone@gmail.com"
                      onChange={(e) => this.onChange(e)}
                    ></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      onChange={(e) => this.onChange(e)}
                      id="inputPassword4"
                    ></input>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Sign up
              </button>
              <a className="btn btn-link btn-sm" href="/login">
                Already have an account
              </a>
              {this.state.message.length > 0 && (
                <div className="bar error">{this.state.message}</div>
              )}
            </form>
          </div>
        </div>
      );
    }
  }
}

export default Signup;
