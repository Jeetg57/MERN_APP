import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import loading from "../../assets/formLoading.gif";

class babyRegistration extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      parentName: "",
      phoneNumber: 0,
      birthDate: null,
      message: "",
      sending: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState(() => ({ sending: true }));
    ToastsStore.success("Sending Data...");
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      parentName: this.state.parentName,
      phoneNumber: this.state.phoneNumber,
      date: this.state.birthDate,
    };
    const config = {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post("/babyReg", data, config)
      .then((response) => {
        this.setState(() => ({ sending: false }));
        ToastsStore.success("Data Successfully Sent.");
        window.location = `/babyRegistration/success/${response.data.regId}`;
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data }));
      });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState(() => ({ message: "" }));
  }
  render() {
    return (
      <div className="container">
        <div className="login-form">
          <h1 className="text-center mt-5">Baby Registration</h1>
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="form-group col-md-6">
                <label>First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  type="text"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Parent Name</label>
                <input
                  id="parentName"
                  name="parentName"
                  placeholder="Parent/Guardians Name"
                  type="text"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group col-md-6">
                <label>Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  type="text"
                  maxlength="10"
                  required="required"
                  className="form-control"
                  onChange={(e) => this.onChange(e)}
                />
              </div>
            </div>
            <div className="form-group col-md-5 p-0">
              <label>Date of birth</label>
              <input
                id="date"
                name="birthDate"
                placeholder="date"
                type="date"
                required="required"
                className="form-control"
                onChange={(e) => this.onChange(e)}
              />
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
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
        </div>
      </div>
    );
  }
}

export default babyRegistration;
