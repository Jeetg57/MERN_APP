import React, { Component } from "react";
import axios from "axios";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
class AllResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      received: false,
      message: "",
    };
    this.deleteImage = this.deleteImage.bind(this);
  }
  componentDidMount() {
    this.getAllResults();
  }
  getAllResults = () =>
    axios
      .get("/metric", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ results: response.data });
        this.received = true;
      })
      .catch((err) => {
        console.log(err.response);
        this.setState(() => ({ message: err.response.data }));
      });
  deleteImage(e) {
    axios
      .delete(`/metric/${e.target.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        ToastsStore.success(
          `Successfully deleted ${res.data.deletedCount} image`
        );
        this.getAllResults();
      })
      .catch((error) => {
        console.log(error.response.data);
        ToastsStore.success(`Failed to delete this image`);
      });
  }

  render() {
    if (this.received === false) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="container-sm mt-4">
          {
            <table className="table table-borderless custom-tbl">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Registration ID</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Score</th>
                  <th scope="col">Height</th>
                  <th scope="col">Weight</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Location</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              {this.state.results.map((image) => (
                <tbody key={image._id}>
                  <tr>
                    <th scope="row">
                      {" "}
                      <img
                        src={image.file.filename}
                        className="w-100 img-fluid"
                        alt={image.file.filename}
                      />{" "}
                    </th>
                    <td className="align-middle">{image.regID}</td>
                    <td className="align-middle">{image.issue}</td>
                    <td className="align-middle">{image.score}/1</td>
                    <td className="align-middle">{image.height} cm</td>
                    <td className="align-middle">{image.weight} kg</td>
                    <td className="align-middle">{image.temperature} °C</td>
                    <td className="align-middle">{image.location}</td>
                    <td className="align-middle">
                      <button
                        onClick={this.deleteImage}
                        id={image._id}
                        className="p-2 btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
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

export default AllResults;
