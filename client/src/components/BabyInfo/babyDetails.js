import React, { Component } from "react";
import axios from "axios";
import image from "../../assets/loading.gif";

class babyDetails extends Component {
  constructor() {
    super();
    this.state = {
      babies: [],
      metrics: [],
      received: false,
      message: "",
    };
  }

  componentDidMount() {
    this.getPhotos();
  }
  getPhotos = async () => {
    const {
      match: { params },
    } = this.props;
    await axios
      .get(`/babyReg/${params.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ babies: response.data });
        this.setState({ metrics: response.data.metrics });
        this.setState({ received: true });
      })
      .catch((err) => {
        this.setState({ message: err.response.data });
      });
  };

  render() {
    if (this.state.received === false) {
      return (
        <div className="container mt-3">
          <div>
            <h1>Loading</h1>
            <h3>Please be patient</h3>
            <img src={image} alt="Loading"></img>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="chart mt-4">
            <h5>REGISTRATION ID: {this.state.babies.regId}</h5>
            <h2>
              BABY NAME:
              {this.state.babies.firstName} {this.state.babies.lastName}
            </h2>
            <h3>PARENT NAME: {this.state.babies.parentName}</h3>
            <h3>PARENT PHONE NUMBER: {this.state.babies.phoneNumber}</h3>
            <h3>
              BABY BIRTHDATE:{" "}
              {new Date(this.state.babies.birthDate).toDateString()}
            </h3>
          </div>

          <div className="row mt-4">
            {this.state.metrics.map((metric) => (
              <div className="col-md-5">
                <div className="row">
                  <div className="col">
                    <img src={`/${metric.file.filename}`}></img>
                  </div>
                  <div className="col">
                    <p>Height: {metric.height}</p>
                    <p>Weight: {metric.weight}</p>
                    <p>Temperature: {metric.temperature}</p>
                    <p>Location: {metric.location}</p>
                    <p>Issue: {metric.issue}</p>
                    <p>Score: {metric.score}</p>
                    <p>Date: {new Date(metric.date).toDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default babyDetails;
