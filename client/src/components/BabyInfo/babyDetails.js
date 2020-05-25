import React, { Component } from "react";
import axios from "axios";
import image from "../../assets/loading.gif";
import weightIcon from "../../assets/weight icon.png";
import skinIcon from "../../assets/skin.png";
import heightIcon from "../../assets/height.png";
import temperatureIcon from "../../assets/temperature.png";
import moment from "moment";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bulma/tabulator_bulma.min.css";
import { ReactTabulator } from "react-tabulator";
import Chart from "chart.js";
import day from "dayjs";
import * as d3 from "d3";
import HeightThreshold from "../../assets/height-threshold.csv";
import WeightThreshold from "../../assets/weight-threshold.csv";
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
      authorized: false,
      rash: 0,
      status: null,
      noIssues: 0,
      currentAlert: null,
      alerts: [],
      alertWeight: null,
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
    const id = localStorage.getItem("id");
    await axios
      .get(`/users/others/${id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        if (
          response.data.job_title === "Doctor" ||
          response.data.job_title === "Admin"
        ) {
          axios
            .get(`/babyReg/${params.id}`, {
              headers: { "auth-token": localStorage.getItem("auth-token") },
            })
            .then((response) => {
              this.setState({ babies: response.data });
              this.setState({ metrics: response.data.metrics });
              this.state.metrics.map((item) => {
                var d = moment(this.state.babies.birthDate);
                var scanDate = moment(item.date);
                const diffMonths = Math.round(scanDate.diff(d, "months", true));
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
              axios
                .get(`/babyReg/alerts/${this.state.babies.regId}`, {
                  headers: { "auth-token": localStorage.getItem("auth-token") },
                })
                .then((response) => {
                  this.setState({
                    alerts: response.data[0].alerts[0],
                    currentAlert:
                      response.data[0].alerts[
                        response.data[0].alerts.length - 1
                      ],
                  });
                  this.setState({ authorized: true, received: true });
                  this.renderChart();
                  this.renderChart2();
                  this.renderIssueChart();
                  this.renderTemperatureChart();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
              this.setState({ message: "No Data Found" });
            });
        }
      })

      .catch((err) => {
        this.setState(() => ({ message: err.response.data }));
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
              data: this.state.girlWeights.slice(this.state.months[0]),
              borderDash: [5, 5],
            },
            {
              label: "Boy Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              data: this.state.boyWeights.slice(this.state.months[0]),
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
              data: this.state.boyHeights.slice(this.state.months[0]),
              label: "Boy Threshold",
              backgroundColor: "rgba(69, 179, 157,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              borderDash: [5, 5],
            },
            {
              data: this.state.girlHeights.slice(this.state.months[0]),
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
    } else if (this.state.authorized === false) {
      return (
        <div>
          <h1>You are not authorized to view these details</h1>
        </div>
      );
    } else if (this.state.message.length > 0) {
      return (
        <div className="container mt-5">
          <h1 className="four0four">404</h1>
          <h2>Error, No data found for this ID!</h2>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="d-flex flex-row justify-content-between mt-3">
            <div className="p-2">
              <h1 className="">Baby Detail</h1>
            </div>
            <div className="p-2">
              <h2 className="badge-pill badge-light p-2">
                Status:{" "}
                <span style={{ color: "#DD1010  ", fontWeight: "bold" }}>
                  Critical
                </span>
              </h2>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-7">
              <div className="col-md-12 boxes">
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
                  <div className="row mt-2">
                    <div className="col detail_title">Baby Gender</div>
                    <div className="col">{this.state.babies.gender}</div>
                  </div>
                  <div className="row  mt-2">
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
            <div className="col boxes">
              <div className="col-md-12 ">
                <div className="col-md-12 ">
                  <div className="pt-2">
                    <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                      Issues ᛫
                    </span>{" "}
                    <span
                      className="text-muted pl-1"
                      style={{ fontSize: "20px" }}
                    >
                      As of{" "}
                      {moment(this.state.currentAlert.date).format(
                        "dddd Do MMMM, YYYY"
                      )}
                    </span>
                  </div>

                  {this.state.currentAlert.weight !== undefined &&
                    this.state.currentAlert.weight !== "Initial" && (
                      <div>
                        <hr />
                        <div className="row mt-1">
                          <div className="col-sm-2">
                            <img src={weightIcon} alt="icon" />
                          </div>
                          <div className="col-sm-10">
                            {this.state.currentAlert.weight}
                          </div>
                        </div>
                      </div>
                    )}
                  {this.state.currentAlert.issue !== undefined &&
                    this.state.currentAlert.issue !== "Initial" && (
                      <div>
                        <hr />
                        <div className="row mt-1">
                          <div className="col-sm-2">
                            <img src={skinIcon} alt="icon" />
                          </div>
                          <div className="col-sm-10">
                            {this.state.currentAlert.issue}
                          </div>
                        </div>
                      </div>
                    )}
                  {this.state.currentAlert.height !== undefined &&
                    this.state.currentAlert.height !== "Initial" && (
                      <div>
                        <hr />
                        <div className="row mt-1">
                          <div className="col-sm-2">
                            <img src={heightIcon} alt="icon" />
                          </div>
                          <div className="col-sm-10">
                            {this.state.currentAlert.height}
                          </div>
                        </div>
                      </div>
                    )}
                  {this.state.currentAlert.temperature !== undefined &&
                    this.state.currentAlert.temperature !== "Initial" && (
                      <div>
                        <hr />
                        <div className="row mt-1">
                          <div className="col-sm-2">
                            <img src={temperatureIcon} alt="icon" />
                          </div>
                          <div className="col-sm-10">
                            {this.state.currentAlert.temperature}
                          </div>
                        </div>
                        <hr />
                      </div>
                    )}
                  {this.state.currentAlert.normal !== undefined &&
                    this.state.currentAlert.normal !== "Initial" && (
                      <div>
                        <hr />
                        <div className="row mt-1">
                          <div className="col-sm-2">
                            <img src={skinIcon} alt="icon" />
                          </div>
                          <div className="col-sm-10">
                            {this.state.currentAlert.normal}
                          </div>
                        </div>
                      </div>
                    )}
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
