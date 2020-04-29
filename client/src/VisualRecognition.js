import React, { Component } from "react";
import axios from "axios";
class VisualRecognition extends Component {
  constructor() {
    super();
    this.state = {
      result: "Not yet retreived",
      percentage: "Not yet received",
      message: "",
    };
    this.handleClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick = () => {
    axios
      .get("/results", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          result: response.data[1].images[0].classifiers[0].classes[0].class,
          percentage:
            response.data[1].images[0].classifiers[0].classes[0].score,
        });
      })
      .catch((err) => {
        console.log(err.response);
        this.setState(() => ({ message: err.response.data }));
      });
  };
  render() {
    return (
      <div className="container">
        {this.state.message.length > 0 && (
          <div>
            <h1>
              Your login has expired. Click <a href="/login">here</a> to login
              again
            </h1>
            <div className="bar error">{this.state.message}</div>
          </div>
        )}
        <h1>Results are: {this.state.result}</h1>
        <h2>{this.state.percentage * 100}% sure</h2>
        <button onClick={this.handleClick} className="btn btn-primary">
          Get Visual Recognition information
        </button>
      </div>
    );
  }
}

export default VisualRecognition;
