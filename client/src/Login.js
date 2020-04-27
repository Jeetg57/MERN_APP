import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="login-form">
          <h1 className="text-center mt-5">Login</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              ></input>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              ></input>
              <label className="form-check-label" for="exampleCheck1">
                Remember me{" "}
              </label>
              <small id="emailHelp" className="form-text text-muted">
                Forgot Password?
              </small>
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <a class="btn btn-link btn-sm" href="/signup">
                Click here to register
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
