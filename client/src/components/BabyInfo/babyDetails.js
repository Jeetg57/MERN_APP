import React, { Component } from "react";
import axios from "axios";
import image from "../../assets/loading.gif";
import weightIcon from "../../assets/weight icon.png";
import skinIcon from "../../assets/skin.png";
import heightIcon from "../../assets/height.png";
import temperatureIcon from "../../assets/temperature.png";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bulma/tabulator_bulma.min.css";
import { ReactTabulator } from "react-tabulator";
import Chart from "chart.js";
import day from "dayjs";
import generateAlert from "../Alerts/Alert";
import * as d3 from "d3";
import HeightThreshold from "../Alerts/height-threshold.csv";
import WeightThreshold from "../Alerts/weight-threshold.csv";
import "chartjs-plugin-annotation";
class babyDetails extends Component {
  constructor() {
    super();
    this.state = {
      babies: [],
      metrics: [],
      received: false,
      weights: [],
      dates: [],
      heights: [],
      months: [],
      threshold: [],
      boyHeights: [],
      girlHeights: [],
      boyWeights: [],
      girlWeights: [],
      temperature: [],
      rash: 0,
      noIssues: 0,
      message: "",
    };
    this.getHeightThresholdValues = this.getHeightThresholdValues.bind(this);
  }
  dateFormatter = function (cell, formatterParams) {
    var value = cell.getValue();

    if (value) {
      value = day(value).format("ddd DD MMM YYYY");
    }

    return value;
  };
  componentDidMount() {
    this.getPhotos();
    this.getHeightThresholdValues();
    this.setState({
      columns: [
        { title: "_id", field: "_id", visible: false },
        {
          title: "Height (cm)",
          field: "height",
          headerFilter: "input",
        },
        {
          title: "Weight (g)",
          field: "weight",
          headerFilter: "input",
        },
        {
          title: "Temperature (°C)",
          field: "temperature",
          headerFilter: "input",
        },
        {
          title: "Location",
          field: "location",
          headerFilter: "input",
        },
        {
          title: "Issue",
          field: "issue",
          headerFilter: "input",
        },
        {
          title: "Score",
          field: "score",
        },
        {
          title: "Date",
          field: "date",
          sorter: "date",
          formatter: this.dateFormatter,
        },
      ],
    });
  }
  getPhotos = async () => {
    const {
      match: { params },
    } = this.props;
    await axios
      .get(`/babyReg/${params.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        this.setState({ babies: response.data });
        this.setState({ metrics: response.data.metrics });
        this.setState({ received: true });
        this.state.metrics.map((item) => {
          var d = new Date(this.state.babies.birthDate);
          var scanDate = new Date(item.date);
          const diffTime = Math.abs(scanDate - d);
          const diffMonths = Math.ceil(diffTime / 2592000000);
          if (!this.state.months.includes(diffMonths)) {
            this.state.weights.push(item.weight);
            this.state.months.push(diffMonths);
            this.state.dates.push(item.date);
            this.state.heights.push(item.height);
            if (item.issue === "Rash") {
              this.state.rash += 1;
            } else {
              this.state.noIssues += 1;
            }
            this.state.temperature.push(item.temperature);
          }

          return true;
        });

        this.renderChart();
        this.renderChart2();
        this.renderIssueChart();
        this.renderTemperatureChart();
        generateAlert(
          this.state.metrics.slice(-1)[0],
          this.state.babies.birthDate
        );
      })
      .catch((err) => {
        console.log(err);
        this.setState({ message: "No Data Found" });
      });
  };
  getHeightThresholdValues = () => {
    d3.csv(HeightThreshold).then((data) => {
      data.map((row) => {
        this.state.boyHeights.push(Number(row.Boys));
        this.state.girlHeights.push(Number(row.Girls));
        return true;
      });
    });
    d3.csv(WeightThreshold).then((data) => {
      data.map((row) => {
        this.state.boyWeights.push(Number(row.Boys));
        this.state.girlWeights.push(Number(row.Girls));
        return true;
      });
    });
  };
  tempreatureChart = React.createRef();
  renderTemperatureChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.tempreatureChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "bar",
        data: {
          //Bring in data
          labels: this.state.months,
          datasets: [
            {
              label: "Temperature",
              backgroundColor: "rgba(52, 73, 94,0.4)",
              borderColor: "rgba(52, 73, 94,1)",
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#3e95cf",
              ],
              data: this.state.temperature,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: false,
          annotation: {
            annotations: [
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: 37.5,
                borderColor: "rgb(204, 29, 29)",
                borderWidth: 4,
                label: {
                  enabled: true,
                  content: "Max",
                },
              },
              {
                type: "line",
                mode: "horizontal",
                scaleID: "y-axis-0",
                value: 35.5,
                borderColor: "rgb(204, 29, 29)",
                borderWidth: 4,
                label: {
                  enabled: true,
                  content: "Min",
                },
              },
            ],
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 35,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Age in months",
                },
              },
            ],
          },
        },
      });
    } else {
    }
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
          labels: this.state.months,
          datasets: [
            {
              label: "Weight",
              backgroundColor: "rgba(255,153,0,0.4)",
              borderColor: "rgba(255,153,0,1)",
              data: this.state.weights,
            },
            {
              label: "Girl Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(52, 73, 94 ,0.5)",
              data: this.state.girlWeights,
              borderDash: [5, 5],
            },
            {
              label: "Boy Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              data: this.state.boyWeights,
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Age in months",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Weight in grams",
                },
              },
            ],
          },
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
          labels: this.state.months,
          datasets: [
            {
              data: this.state.boyHeights,
              label: "Boy Threshold",
              backgroundColor: "rgba(69, 179, 157,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              borderDash: [5, 5],
            },
            {
              data: this.state.girlHeights,
              label: "Girl Threshold",
              backgroundColor: "rgba(69, 179, 157,0)",
              borderColor: "rgba(52, 73, 94 ,0.5)",
              borderDash: [5, 5],
            },
            {
              label: "Height",
              backgroundColor: "rgba(236, 112, 99,0.4)",
              borderColor: "rgba(236, 112, 99,1)",
              data: this.state.heights,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Age in months",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Height in cm",
                },
              },
            ],
          },
        },
      });
    }
  };
  issueChart = React.createRef();
  renderIssueChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.issueChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "doughnut",
        data: {
          //Bring in data
          labels: ["Rash", "No Issues"],
          datasets: [
            {
              backgroundColor: ["rgba(231, 76, 60 ,1)", "rgba(88, 214, 141,1)"],
              data: [this.state.rash, this.state.noIssues],
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

  render() {
    const options = {
      pagination: "local",
      paginationSize: 20,
      movableRows: true,
      movableColumns: true,
    };
    if (this.state.message.length > 0) {
      return (
        <div className="container mt-5">
          <h1 className="four0four">404</h1>
          <h2>Error, No data found for this ID!</h2>
        </div>
      );
    } else if (this.state.received === false) {
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
        <div className="container">
          <div className="row mt-4">
            <div className="col">
              <h1 className="">Baby Detail</h1>
            </div>
            <div className="col col-md-3">
              <div>
                <h2 className="chart">
                  Status:{" "}
                  <span style={{ color: "#DD1010  ", fontWeight: "bold" }}>
                    Critical
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-8">
              <div className="col-md-12 chart">
                <div className="col babyDetails">
                  <div className="row mt-4">
                    <div className="col detail_title">Registration ID</div>
                    <div className="col">{this.state.babies.regId}</div>
                  </div>
                  <div className="row  mt-2">
                    <div className="col detail_title">Baby Name</div>
                    <div className="col">
                      {this.state.babies.firstName} {this.state.babies.lastName}
                    </div>
                  </div>
                  <div className="row  mt-22">
                    <div className="col detail_title">Parent Name</div>
                    <div className="col">{this.state.babies.parentName}</div>
                  </div>
                  <div className="row mt-2">
                    <div className="col detail_title">Parent Phone</div>
                    <div className="col">{this.state.babies.phoneNumber}</div>
                  </div>

                  <div className="row mt-2 mb-4">
                    <div className="col detail_title">Date Of Birth</div>
                    <div className="col">
                      {new Date(this.state.babies.birthDate).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col chart">
              <div className="col-md-12 ">
                <div className="col-md-12 ">
                  <h3>Issues</h3>
                  <div className="row mt-1">
                    <div className="col-sm-2">
                      <img src={weightIcon} />
                    </div>
                    <div className="col-sm-10">
                      This baby is underweight by 600 grams
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-1">
                    <div className="col-sm-2">
                      <img src={skinIcon} />
                    </div>
                    <div className="col-sm-10">
                      Baby has been identified with rash
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-1">
                    <div className="col-sm-2">
                      <img src={heightIcon} />
                    </div>
                    <div className="col-sm-10">
                      This baby is underheight by 4cm
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-1">
                    <div className="col-sm-2">
                      <img src={temperatureIcon} />
                    </div>
                    <div className="col-sm-10">
                      This baby has a critical temperature of 40°C
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.metrics.length > 0 && (
            <a
              href={`/baby/${this.state.babies._id}/pictures`}
              className="btn btn-primary mt-3"
            >
              View Pictures
            </a>
          )}

          {this.state.metrics.length > 0 && (
            <ReactTabulator
              className="mt-4"
              options={options}
              ref={(ref) => (this.ref = ref)}
              data={this.state.metrics}
              columns={this.state.columns}
              tooltips={true}
              layout={"fitData"}
              rowClick={this.rowClick}
            />
          )}
          {this.state.metrics.length === 0 && (
            <h1 className="mt-4 ">
              There are no available metrics for this baby
            </h1>
          )}
          <h1>Charts</h1>
          <div className="mb-5">
            <div className="">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">Baby Age Against Weight</h4>
                <hr />
                <canvas id="weightChart" className="" ref={this.weightChart} />
              </div>
            </div>
            <div className="mt-4">
              <div className="chart">
                <h4 className="chart-heading">Baby Age Against Height</h4>
                <hr />
                <canvas id="heightChart" className="" ref={this.heightChart} />
              </div>
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div className="col-md-6 ">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">Skin Issues</h4>

                <hr />
                <canvas id="issueChart" className="" ref={this.issueChart} />
              </div>
            </div>

            <div className="col-md-6 ">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">
                  Baby Age Against Temperature in °C
                </h4>
                <hr />
                <canvas
                  id="temperatureChart"
                  className=""
                  ref={this.tempreatureChart}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default babyDetails;
