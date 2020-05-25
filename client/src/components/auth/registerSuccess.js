import React, { Component } from "react";

class registerSuccess extends Component {
  render() {
    return (
      <div className="container vertical-center">
        <h1 style={{ fontSize: "80px" }}>Registration Success</h1>
        <a href="/login" className="btn btn-lg btn-outline-primary mt-5">
          Click here to login
        </a>
      </div>
    );
  }
}

export default registerSuccess;
