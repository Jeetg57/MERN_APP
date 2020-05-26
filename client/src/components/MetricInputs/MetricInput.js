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
  componentDidMount() {
    if (localStorage.getItem("auth-token") === null) {
      window.location = "/login";
    }
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
      .post("/baby-metric", formData, config)
      .then((response) => {
        this.setState(() => ({ sending: false }));
        ToastsStore.success("Data Successfully Sent.");
      })
      .catch((error) => {
        ToastsStore.error(error.response.data);
        this.setState(() => ({ sending: false }));
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
      <div className="container vertical-center">
        {this.state.sending === null}
        <div className="boxes">
          <h1 className="text-center mt-2">Input Baby Details Here</h1>
          <form onSubmit={this.onFormSubmit} className="p-4">
            <div className="form-group ">
              <label>Registration ID</label>
              <input
                id="regID"
                name="regID"
                placeholder="eg. 12121221"
                type="number"
                required="required"
                className="form-control"
                onChange={(e) => this.onChange(e)}
              />
            </div>
            <div className="row">
              <div className="form-group col">
                <label>Baby Height</label>
                <input
                  id="height"
                  name="height"
                  placeholder="Height in centimeters"
                  type="number"
                  className="form-control"
                  required="required"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group col">
                <label>Baby Weight</label>
                <input
                  id="weight"
                  name="weight"
                  placeholder="Weight in grams"
                  type="number"
                  className="form-control"
                  required="required"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group col">
                <label>Baby Temperature</label>
                <input
                  id="temperature"
                  name="temperature"
                  placeholder="Temperature in degree celcius"
                  type="number"
                  className="form-control"
                  required="required"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col">
                <label>Input Image</label>
                <input
                  type="file"
                  name="file"
                  placeholder="Picture of the baby"
                  className="form-control p-1"
                  onChange={(e) => this.onFileChange(e)}
                />
              </div>
              <div className="form-group col">
                <label>State</label>
                <select
                  id="inputState"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                  name="location"
                >
                  <option defaultValue>None</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Naivasha">Naivasha</option>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Kisumu">Kisumu</option>
                  <option value="Kakamega">Kakamega</option>
                </select>
              </div>
            </div>
            <div className="">
              <div className="form-group text-right">
                <button
                  name="submit"
                  type="submit"
                  className="btn btn-outline-primary"
                >
                  Submit
                </button>
                <button
                  name="reset"
                  type="reset"
                  className="btn btn-light ml-3"
                >
                  Reset
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
          {this.state.message.length > 0 && (
            <div className="bar error">{this.state.message}</div>
          )}
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
