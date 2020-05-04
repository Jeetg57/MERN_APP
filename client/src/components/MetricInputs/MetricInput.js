import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import loading from "../../assets/formLoading.gif";

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
      sending: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState(() => ({ sending: true }));
    const formData = new FormData();
    ToastsStore.success("Sending Data...");
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
        this.setState(() => ({ sending: false }));
        ToastsStore.success("Data Successfully Sent.");
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data }));
      });
    e.target.reset();
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
        {this.state.sending === null}
        <div className="login-form">
          <h1 className="text-center mt-5">Input Baby Details Here</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="form-group">
              <label>Registration ID</label>
              <input
                id="regID"
                name="regID"
                placeholder="eg. 12121221"
                type="text"
                required="required"
                className="form-control"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Baby Height</label>
              <input
                id="height"
                name="height"
                placeholder="Height in centimeters"
                type="text"
                className="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Baby Weight</label>
              <input
                id="weight"
                name="weight"
                placeholder="Weight in grams"
                type="text"
                className="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Baby Temperature</label>
              <input
                id="temperature"
                name="temperature"
                placeholder="Temperature in degree celcius"
                type="text"
                className="form-control"
                required="required"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="form-group">
              <label>Input Image</label>
              <input
                type="file"
                name="file"
                placeholder="Picture of the baby"
                className="form-control p-1"
                onChange={(e) => this.onFileChange(e)}
              />
            </div>
            <div class="form-group">
              <label>State</label>
              <select
                id="inputState"
                class="form-control"
                onChange={(e) => this.onChange(e)}
                name="location"
              >
                <option selected>None</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Naivasha">Naivasha</option>
                <option value="Kiambu">Kiambu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Kakamega">Kakamega</option>
              </select>
            </div>
            <div className="">
              <div className="form-group">
                <button
                  name="submit"
                  type="submit"
                  className="btn btn-outline-primary"
                >
                  Submit
                </button>
                {this.state.sending === true && (
                  <div>
                    <span>
                      <img
                        src={loading}
                        alt="loading"
                        className="ml-3"
                        style={{ width: "50px" }}
                      ></img>
                      <h4>Sending Data, Please Hold On</h4>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </form>
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
        </div>
      </div>
    );
  }
}

export default MetricInput;
