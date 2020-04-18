import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
export const APIURL = "http://localhost:5000";

class VisualRecognitionModel extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      images: [],
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getPhotos = () =>
    axios.get("/images").then((response) => {
      console.log(response.data);
      this.setState({ images: response.data });
    });
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("/images/upload", formData, config)
      .then((response) => {
        ToastsStore.success("The file is successfully uploaded");
        this.getPhotos();
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div>
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
                <div key={image._id} className="p-2 bd-highlight">
                  <img
                    src={image.path}
                    className="img-thumbnail photoImg"
                    alt={image.filename}
                  ></img>
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

export default VisualRecognitionModel;
