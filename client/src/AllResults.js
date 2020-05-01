import React, { Component } from "react";
import axios from "axios";
class AllResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      received: false,
      message: "",
    };
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

  render() {
    if (this.received === false) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div className="jumbotron">
          {
            <table class="table table-bordered table-secondary">
              <thead>
                <tr className="thead-dark">
                  <th scope="col">Image</th>
                  <th scope="col">Issue</th>
                  <th scope="col">Score</th>
                  <th scope="col">Height</th>
                  <th scope="col">Weight</th>
                  <th scope="col">temperature</th>
                  <th scope="col">Location</th>
                </tr>
              </thead>
              {this.state.results.map((image) => (
                <tbody>
                  <tr>
                    <th scope="row">
                      {" "}
                      <img
                        src={image.file.filename}
                        className="img-fluid p-1 m-0 w-25"
                        alt={image.file.filename}
                      />{" "}
                    </th>
                    <td>{image.issue}</td>
                    <td>{image.score}</td>
                    <td>{image.height}</td>
                    <td>{image.weight}</td>
                    <td>{image.temperature}</td>
                    <td>{image.location}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          }
        </div>
      );
    }
  }
}

export default AllResults;
