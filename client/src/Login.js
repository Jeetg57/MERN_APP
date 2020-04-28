import React, { Component } from "react";
import axios from "axios";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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
        <div className="login-form">
          <h1 className="text-center mt-5">Login</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                onChange={(e) => this.onChange(e)}
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                required
                onChange={(e) => this.onChange(e)}
              ></input>
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <a className="btn btn-link btn-sm" href="/signup">
                Click here to register
              </a>
            </div>
          </form>
          {this.state.message.length > 0 && (
            <div className="bar error">{this.state.message}</div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
