import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";

class Charts extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      image_id: [],
      image_size: [],
      received: false,
    };
  }

  getPhotos = () => {
    axios.get("/images").then((response) => {
      console.log(response.data);
      this.setState({ images: response.data });
      this.state.images.map((image) => {
        this.state.image_id.push(image._id);
        this.state.image_size.push(image.size);
        this.setState({ received: true });
      });
    });
  };

  componentDidMount() {
    this.getPhotos();
  }
  chartRef = React.createRef();
  renderChart = () => {
    if (this.state.received == true) {
      const myChartRef = this.chartRef.current.getContext("2d");
      let ids = this.state.image_id;
      console.log(ids);
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Size",
              data: this.state.image_size,
              fill: false,
              borderColor: "#900C3F",
            },
          ],
        },
        options: {
          //Customize chart options
        },
      });
    } else {
    }
  };

  render() {
    if (this.state.received == true) {
      return (
        <div className="container mt-3">
          <button onClick={this.renderChart} className="btn btn-outline-dark">
            Render Chart
          </button>
          <div>
            <canvas id="myChart" ref={this.chartRef} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-3">
          <div>Loading...</div>
        </div>
      );
    }
  }
}

export default Charts;
