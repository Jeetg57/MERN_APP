import React, { Component } from "react";

class Signup extends Component {
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
                <label for="inputEmail4">First Name</label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                ></input>
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Last Name</label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                ></input>
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Email</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="e.g. someone@gmail.com"
              ></input>
            </div>
            <div class="form-group">
              <label for="inputAddress2">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress2"
              ></input>
            </div>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputCity">Phone</label>
                <input type="text" class="form-control" id="inputCity"></input>
              </div>
              <div class="form-group col-md-4">
                <label for="inputCity">Job Title</label>
                <input type="text" class="form-control" id="inputCity"></input>
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
                  <label for="inputEmail4">Username</label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                  ></input>
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
