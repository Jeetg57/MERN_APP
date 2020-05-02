import React, { Component } from "react";
import Chart from "chart.js";
import axios from "axios";
import image from "../../assets/loading.gif";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      image_id: [],
      image_size: [],
      height: [],
      received: false,
      rash: [],
      noIssues: [],
      areas: [],
      temperature: [],
      score: [],
      message: "",
    };
  }

  getPhotos = async () => {
    await axios
      .get("/metric", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ images: response.data });
        this.state.images.map((image) => {
          this.state.image_id.push(image.regID);
          this.state.image_size.push(image.weight);
          this.state.height.push(image.height);
          if (image.issue === "Rash") {
            this.state.rash.push(image.issue);
          } else {
            this.state.noIssues.push(image.issue);
          }
          this.state.areas.push(image.location);
          this.state.temperature.push(image.temperature);
          this.state.score.push(image.score * 100);
          this.setState({ received: true });
          return true;
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState(() => ({ message: err.response.data }));
      });
    this.renderChart();
    this.renderChart2();
    this.renderAreaChart();
    this.renderTemperatureChart();
    this.renderIssueChart();
    this.renderAccuracyChart();
  };

  weightChart = React.createRef();
  renderChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.weightChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Weight",
              backgroundColor: "rgba(255,153,0,0.4)",
              borderColor: "rgba(255,153,0,1)",
              data: this.state.image_size,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
        },
      });
    } else {
    }
  };
  heightChart = React.createRef();
  renderChart2 = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.heightChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Height",
              backgroundColor: "rgba(236, 112, 99,0.4)",
              borderColor: "rgba(236, 112, 99,1)",
              data: this.state.height,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
        },
      });
    } else {
    }
  };
  areaChart = React.createRef();
  renderAreaChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.areaChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "pie",
        data: {
          //Bring in data
          labels: this.state.areas,
          datasets: [
            {
              label: "Location",
              backgroundColor: "rgba(255, 195, 0,1)",
              borderColor: "rgba(255, 195, 0,1)",
              data: [this.state.areas.length],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
        },
      });
    } else {
    }
  };
  tempreatureChart = React.createRef();
  renderTemperatureChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.tempreatureChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: "rgba(52, 73, 94,0.4)",
              borderColor: "rgba(52, 73, 94,1)",
              data: this.state.temperature,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
        },
      });
    } else {
    }
  };
  issueChart = React.createRef();
  renderIssueChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.issueChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "pie",
        data: {
          //Bring in data
          labels: ["Rash", "No Issues"],
          datasets: [
            {
              backgroundColor: ["rgba(231, 76, 60 ,1)", "rgba(88, 214, 141,1)"],
              data: [this.state.rash.length, this.state.noIssues.length],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: { position: "bottom" },
        },
      });
    } else {
    }
  };
  accuracyChart = React.createRef();
  renderAccuracyChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.accuracyChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.image_id,
          datasets: [
            {
              label: "Accuracy",
              backgroundColor: "rgba(69, 179, 157 ,0.4)",
              borderColor: "rgba(69, 179, 157 ,1)",
              data: this.state.score,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
          scales: {
            xAxes: [
              {
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
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
          <h1 className="db-name">DASHBOARD</h1>
          <div className="chart">
            <h4 className="chart-heading">Performance</h4>
            <hr />
            <div className="row">
              <div className="col-md-4">
                <div className="col-md-10">
                  <h3 className="text-center">{this.state.images.length}</h3>
                  <h4 className="text-center">Babies Scanned</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-10">
                  <h3 className="text-center">{this.state.rash.length}</h3>
                  <h4 className="text-center">Identified with Rash</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="col-md-10 ">
                  <h3 className="text-center">{this.state.noIssues.length}</h3>
                  <h4 className="text-center">Identified with No Issues</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 ">
              <div class="col-md-12 chart">
                <h4 className="chart-heading">Baby ID Against Weight</h4>
                <hr />
                <canvas id="weightChart" className="" ref={this.weightChart} />
              </div>
            </div>
            <div className="col-md-6">
              <div class="col-md-12 chart">
                <h4 className="chart-heading">Baby ID Against Height</h4>
                <hr />
                <canvas id="heightChart" className="" ref={this.heightChart} />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8 ">
              <div class="col-md-12 chart">
                <h4 className="chart-heading">
                  Baby ID Against Temperature in °C
                </h4>
                <hr />
                <canvas
                  id="temperatureChart"
                  className=""
                  ref={this.tempreatureChart}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div class="col-md-12 chart h-100">
                <h4 className="chart-heading">Location</h4>
                <hr />
                <canvas id="areaChart" className="" ref={this.areaChart} />
              </div>
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div className="col-md-6 ">
              <div class="col-md-12 chart">
                <h4 className="chart-heading">Skin Issues</h4>
                <hr />
                <canvas id="issueChart" className="" ref={this.issueChart} />
              </div>
            </div>
            <div className="col-md-6">
              <div class="col-md-12 chart">
                <h4 className="chart-heading">
                  Accuracy of Visual Recognition in %
                </h4>
                <hr />
                <canvas
                  id="accuracyChart"
                  className=""
                  ref={this.accuracyChart}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container mt-3">
          <div>
            <h1>Loading</h1>
            <h3>Please be patient</h3>
            <img src={image} alt="Loading"></img>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
