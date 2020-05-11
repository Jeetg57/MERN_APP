import React, { Component } from "react";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import axios from "axios";
import image from "../../assets/loading.gif";
class babyDash extends Component {
  constructor() {
    super();
    this.state = {
      babies: [],
      received: false,
      message: "",
    };
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    this.getPhotos();
  }
  getPhotos = async () => {
    await axios
      .get("/babyReg", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        this.setState({ babies: response.data, received: true });
      })
      .catch((err) => {
        this.setState({ message: err.response.data });
      });
  };
  deleteImage(e) {
    axios
      .delete(`/babyReg/${e.target.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        ToastsStore.success(
          `Successfully deleted ${res.data.deletedCount} image`
        );
      })
      .catch((error) => {
        ToastsStore.success(`Failed to delete this image`);
      });
    this.getPhotos();
  }

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
        <div>
          {
            <div className="d-flex flex-row bd-highlight mb-3 flex-wrap ">
              {this.state.babies.map((baby) => (
                <div className="card" key={baby._id}>
                  <div className="p-2 bd-highlight">
                    <p>{baby.regId}</p>
                    <p>
                      {baby.firstName} {baby.lastName}
                    </p>
                  </div>
                  <div className="card-body d-flex flex-row ">
                    <a
                      href={`/baby/${baby._id}`}
                      id={baby._id}
                      className="mr-2 btn btn-info"
                    >
                      More Details
                    </a>
                    <button
                      onClick={this.deleteImage}
                      id={baby._id}
                      className="p-2 btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          }
          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />
        </div>
      );
    }
  }
}

export default babyDash;
