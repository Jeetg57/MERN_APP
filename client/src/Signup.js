import React, { Component } from "react";
const axios = require("axios");
class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      phone: "",
      job_title: "",
      gender: "",
      username: "",
      password: "",
      message: "",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
    const data = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/user/login", data)
      .then((response) => {
        localStorage.setItem("auth-token", response.data);
        window.location = "/";
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data }));
      });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState(() => ({ message: "" }));
  }

  render() {
    return (
      <div className="container">
        <div className="login-form container">
          <div>
            <h1 className="card-title text-center">Sign-up</h1>
          </div>
          <form>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>First Name</label>
                <input type="text" class="form-control"></input>
              </div>
              <div class="form-group col-md-6">
                <label>Last Name</label>
                <input type="text" class="form-control"></input>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                type="email"
                class="form-control"
                id="inputemail"
                placeholder="e.g. someone@gmail.com"
              ></input>
            </div>
            <div class="form-group">
              <label>Address</label>
              <input
                type="address"
                class="form-control"
                id="inputAddress2"
              ></input>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label>Phone</label>
                <input type="phone" class="form-control"></input>
              </div>
              <div class="form-group col-md-4">
                <label>Job Title</label>
                <input type="text" class="form-control"></input>
              </div>
              <div class="form-group col-md-2">
                <label for="inputState">Gender</label>
                <select id="inputState" class="form-control">
                  <option selected>Female</option>
                  <option>Male</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label>Username</label>
                  <input type="username" class="form-control"></input>
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                  ></input>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-outline-primary">
              Sign up
            </button>
            <a class="btn btn-link btn-sm" href="/login">
              Already have an account
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
