import React, { Component } from "react";
import axios from "axios";
class MetricInput extends Component {
  constructor() {
    super();
    this.state = {
      regID: "",
      height: "",
      weight: "",
      temperature: "",
      file: null,
      location: "",
      message: "",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("regID", this.state.regID);
    formData.append("height", this.state.height);
    formData.append("weight", this.state.weight);
    formData.append("temperature", this.state.temperature);
    formData.append("file", this.state.file);
    formData.append("location", this.state.location);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post("/metric", formData, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data }));
      });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState(() => ({ message: "" }));
  }
  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  render() {
    return (
      <div className="container">
        <div className="login-form">
          <h1 className="text-center mt-5">Input Baby Details Here</h1>
          <form onSubmit={this.onFormSubmit}>
            <div class="form-group">
              <label for="regID">Registration ID</label>
              <input
                id="regID"
                name="regID"
                placeholder="eg. 12121221"
                type="text"
                required="required"
                class="form-control"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="height">Baby Height</label>
              <input
                id="height"
                name="height"
                type="text"
                class="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="weight">Baby Weight</label>
              <input
                id="weight"
                name="weight"
                type="text"
                class="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="temperature">Baby Temperature</label>
              <input
                id="temperature"
                name="temperature"
                type="text"
                class="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="File">Input Image</label>
              <input
                type="file"
                name="file"
                className="form-control p-1"
                onChange={(e) => this.onFileChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                class="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div class="form-group">
              <button
                name="submit"
                type="submit"
                class="btn btn-outline-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MetricInput;
