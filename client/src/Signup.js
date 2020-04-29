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
    console.log(this.state);
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
    axios
      .post("/user/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
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
                <input
                  type="text"
                  name="job_title"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                ></input>
              </div>
              <div className="form-group col-md-2">
                <label>Gender</label>
                <select
                  id="inputState"
                  name="gender"
                  onChange={(e) => this.onChange(e)}
                  className="form-control"
                >
                  <option value="Female" defaultChecked>
                    Female
                  </option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Username</label>
                  <input
                    type="username"
                    name="username"
                    className="form-control"
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

export default Signup;
