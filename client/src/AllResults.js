import React, { Component } from "react";
import axios from "axios";
class AllResults extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      received: false,
    };
  }
  componentDidMount() {
    this.getAllResults();
  }
  getAllResults = () =>
    axios.get("/results").then((response) => {
      console.log(response.data);
      this.setState({ results: response.data });
      this.received = true;
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
        <div>
          {
            <div className="d-flex flex-row bd-highlight mb-3 flex-wrap justify-content-center">
              {this.state.results.map((image) => (
                <div className="card" key={image._id}>
                  <div className="p-2 bd-highlight">
                    <img
                      src={image.images[0].image}
                      className="card-img-top photoImg"
                      alt={image.filename}
                    ></img>
                  </div>
                  <p>{image.images[0].classifiers[0].classes[0].class}</p>
                  <p>
                    {image.images[0].classifiers[0].classes[0].score * 100}%
                  </p>
                </div>
              ))}
            </div>
          }
        </div>
      );
    }
  }
}

export default AllResults;
