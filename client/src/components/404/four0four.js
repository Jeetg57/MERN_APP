import React, { Component } from "react";

class four0four extends Component {
  render() {
    return (
      <div className="container ">
        <h1 className="four0four">404</h1>
        <div className="four0four-container">
          <h1>We couldn't find what you were looking for.</h1>
          <p className="four0four-details">
            Unfortunately the page you were looking for could not be found. It
            may be temporarily unavailable, moved or no longer exist.
            <br />
            <hr></hr>
            Check the URL you entered for any mistakes and try again.
            Alternatively, search for whatever is missing or take a look around
            the rest of our site.
          </p>
          <a className="btn btn-primary" href="/">
            Go Home
          </a>
        </div>
      </div>
    );
  }
}

export default four0four;
