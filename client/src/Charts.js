import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";
import image from "./loading.gif";

class Charts extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      image_id: [],
      image_size: [],
      received: false,
      message: "",
    };
  }

  getPhotos = async () => {
    await axios
      .get("/images", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ images: response.data });
        this.state.images.map((image) => {
          this.state.image_id.push(image._id);
          this.state.image_size.push(image.size / 1000);
          this.setState({ received: true });
          return true;
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState(() => ({ message: err.response.data }));
      });
    this.renderChart();
  };

  chartRef = React.createRef();
  renderChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.chartRef.current.getContext("2d");
      let ids = this.state.image_id;
      console.log(ids);
      new Chart(myChartRef, {
        type: "bar",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Size",
              data: this.state.image_size,
              fill: false,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255,99,132,1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          //Customize chart options
          legend: { position: "bottom", align: "start" },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Size in KB",
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  maxRotation: 90,
                  minRotation: 50,
                  fontSize: 8,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Image ID",
                },
              },
            ],
          },
        },
      });
    } else {
    }
  };
  componentDidMount() {
    this.getPhotos();
  }

  render() {
    if (this.state.message.length > 0) {
      return (
        <div className="container">
          <div className="bar error mt-5">{this.state.message}</div>
          <h3>
            Your login has expired. Click <a href="/login">here</a> to login
            again
          </h3>
        </div>
      );
    } else if (this.state.received === true) {
      return (
        <div className="container mt-3">
          <div className="img-thumbnail">
            <h1 className="ml-3">A Graph of Image ID against Image Size</h1>
            <canvas id="myChart" ref={this.chartRef} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-3">
          <div>
            <h1>Loading Chart...</h1>
            <img src={image} alt="Loading"></img>
          </div>
        </div>
      );
    }
  }
}

export default Charts;
