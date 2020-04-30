import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import { Link } from "react-router-dom";
export const APIURL = "http://localhost:5000";

class VisualRecognitionModel extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      images: [],
      message: "",
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  getPhotos = () =>
    axios
      .get("/images", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ images: response.data });
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState(() => ({ message: error.response.data }));
      });
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "auth-token": localStorage.getItem("auth-token"),
      },
    };
    axios
      .post("/images/upload", formData, config)
      .then((response) => {
        ToastsStore.success("The file is successfully uploaded");
        this.getPhotos();
      })
      .catch((error) => {
        console.log(error.response.data);
        this.setState(() => ({ message: error.response.data }));
      });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  deleteImage(e) {
    axios
      .delete(`/images/${e.target.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        ToastsStore.success(
          `Successfully deleted ${res.data.deletedCount} image`
        );
      })
      .catch((error) => {
        this.setState(() => ({ message: error.response.data }));
      });
    this.getPhotos();
  }

  render() {
    if (this.state.message.length > 0) {
      return (
        <div className="container">
          <h1>
            Your login has expired. Click <a href="/login">here</a> to login
            again
          </h1>
          <div className="bar error">{this.state.message}</div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            <input type="file" name="image" onChange={this.onChange} />
            <button type="submit" className="btn btn-secondary">
              Upload
            </button>
          </form>
          <button
            onClick={this.getPhotos}
            className="btn btn-outline-success mt-4"
          >
            Get Photos
          </button>

          <div>
            {
              <div className="d-flex flex-row bd-highlight mb-3 flex-wrap justify-content-center">
                {this.state.images.map((image) => (
                  <div className="card" key={image._id}>
                    <div className="p-2 bd-highlight">
                      <img
                        src={image.path}
                        className="card-img-top photoImg"
                        alt={image.filename}
                      ></img>
                    </div>
                    <div className="card-body d-flex flex-row justify-content-between">
                      <Link
                        to={`/image/${image._id}`}
                        className="btn btn-primary"
                      >
                        Go to image
                      </Link>
                      <button
                        onClick={this.deleteImage}
                        id={image._id}
                        className="p-2 btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>

          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
        </div>
      );
    }
  }
}

export default VisualRecognitionModel;
