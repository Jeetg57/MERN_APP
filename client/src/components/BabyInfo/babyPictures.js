import React, { Component } from "react";
import axios from "axios";
import image from "../../assets/loading.gif";
import { AiOutlineArrowLeft } from "react-icons/ai";
import moment from "moment";
class babyPictures extends Component {
  constructor() {
    super();
    this.state = {
      baby: undefined,
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
        console.log(response.data.metrics);
        this.setState({
          received: true,
          baby: response.data,
          metrics: response.data.metrics,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="">
        {this.state.received === true && (
          <div className="container">
            <a
              href={`/baby/${this.state.baby._id}`}
              style={{ fontSize: "32px" }}
              className="btn btn-link"
            >
              <AiOutlineArrowLeft /> Go Back
            </a>
            <div className="mt-4">
              <div className="boxes">
                <h2>Baby ID: {this.state.baby.regId}</h2>
                <h2>
                  Name: {this.state.baby.firstName} {this.state.baby.lastName}
                </h2>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <h1>Images</h1>
          <div className="d-flex flex-row bd-highlight mb-3 flex-wrap">
            {this.state.metrics.map((metric) => (
              <div className="card">
                <img
                  className="w-100 card-img-top"
                  src={`/${metric.file.path}`}
                  alt="Baby"
                />
                <div class="card-body">
                  <h5 class="card-title">{metric.issue}</h5>
                  <h5 class="card-title">
                    {moment(metric.date).format("ddd DD/MM/YYYY")}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
        {this.state.received === false && (
          <div className="container mt-3">
            <div className="vertical-center">
              <img src={image} alt="Loading"></img>
              <h1 className="horizontal-center">Loading</h1>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default babyPictures;
