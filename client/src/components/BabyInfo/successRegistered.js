import React, { Component } from "react";

class successRegistered extends Component {
  constructor() {
    super();
    this.state = {
      id: undefined,
      received: false,
      printing: false,
      message: "",
    };
  }
  print() {
    window.print();
  }
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    this.setState({ id: params.id });
  }
  render() {
    return (
      <div className="container">
        <h1 className="mt-5">You have Successfully been registered</h1>
        <h3>Your registration ID is</h3>
        <h2
          style={{ color: "#00000 ", fontSize: "100px" }}
          className="p-5 chart mt-5"
        >
          {this.state.id}{" "}
        </h2>
        <button className="btn btn-secondary btn-sm mt-5" onClick={this.print}>
          Print
        </button>
      </div>
    );
  }
}

export default successRegistered;
