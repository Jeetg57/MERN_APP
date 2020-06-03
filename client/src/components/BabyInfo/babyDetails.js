import axios from "axios";
import Chart from "chart.js";
import "chartjs-plugin-annotation";
import * as d3 from "d3";
import moment from "moment";
import React, { Component } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { AiOutlineLineChart } from "react-icons/ai";
import { FaRegImages } from "react-icons/fa";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/bulma/tabulator_bulma.min.css";
import "react-tabulator/lib/styles.css"; // default theme
import thresholds from "../../assets/height-weight-threshold.csv";
import heightIcon from "../../assets/height.png";
import image from "../../assets/loading.gif";
import skinIcon from "../../assets/skin.png";
import successIcon from "../../assets/success.png";
import temperatureIcon from "../../assets/temperature.png";
import weightIcon from "../../assets/weight icon.png";

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
      boyUpperHeights: [],
      girlUpperHeights: [],
      boyUpperWeights: [],
      girlUpperWeights: [],
      temperature: [],
      authorized: false,
      status: null,
      rash: 0,
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
      value = moment(value).format("ddd DD MMM YYYY");
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
          minWidth: 90,
          headerFilter: "input",
        },
        {
          title: "Weight (g)",
          field: "weight",
          minWidth: 90,
          headerFilter: "input",
        },
        {
          title: "Temperature (°C)",
          field: "temperature",
          minWidth: 90,
          headerFilter: "input",
        },
        {
          title: "Location",
          field: "location",
          minWidth: 90,
          headerFilter: "input",
        },
        {
          title: "Issue",
          field: "issue",
          minWidth: 90,
          headerFilter: "input",
        },
        {
          title: "Score",
          field: "score",
          minWidth: 90,
        },
        {
          title: "Date",
          field: "date",
          sorter: "date",
          minWidth: 90,
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
                  console.log(typeof this.state.currentAlert?.temperature);
                  var size = Object.keys(this.state.currentAlert).length;
                  if (this.state.currentAlert.normal !== undefined) {
                    this.setState({ status: "Normal" });
                  } else if (
                    size === 2 &&
                    this.state.currentAlert.normal === undefined
                  ) {
                    this.setState({ status: "Good" });
                  } else if (size === 3) {
                    this.setState({ status: "Fair" });
                  } else if (
                    size === 4 &&
                    this.state.currentAlert.height !== "Initial"
                  ) {
                    this.setState({ status: "Serious" });
                  } else if (size === 5) {
                    this.setState({ status: "Critical" });
                  } else {
                    this.setState({ status: "Undefined" });
                  }
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
    d3.csv(thresholds).then((data) => {
      data.map((row) => {
        this.state.boyHeights.push(Number(row.BLL));
        this.state.girlHeights.push(Number(row.GLL));
        this.state.boyWeights.push(Number(row.BLW));
        this.state.girlWeights.push(Number(row.GLW));
        this.state.boyUpperHeights.push(Number(row.BUL));
        this.state.girlUpperHeights.push(Number(row.GUL));
        this.state.boyUpperWeights.push(Number(row.BUW));
        this.state.girlUpperWeights.push(Number(row.GUW));
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
              label: "Lower Girl Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(52, 73, 94 ,0.5)",
              data: this.state.girlWeights.slice(this.state.months[0]),
              borderDash: [5, 5],
            },
            {
              label: "Lower Boy Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              data: this.state.boyWeights.slice(this.state.months[0]),
              borderDash: [5, 5],
            },
            {
              label: "Upper Girl Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(52, 73, 94 ,0.5)",
              data: this.state.girlUpperWeights.slice(this.state.months[0]),
              borderDash: [5, 5],
            },
            {
              label: "Upper Boy Threshold",
              backgroundColor: "rgba(255,153,0,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              data: this.state.boyUpperWeights.slice(this.state.months[0]),
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: { position: "bottom" },
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
              label: "Height",
              backgroundColor: "rgba(236, 112, 99,0.4)",
              borderColor: "rgba(236, 112, 99,1)",
              data: this.state.heights,
            },
            {
              data: this.state.boyHeights.slice(this.state.months[0]),
              label: "Boy Threshold",
              backgroundColor: "rgba(69, 179, 157,0)",
              borderColor: "rgba(69, 179, 157,0.5)",
              borderDash: [5, 5],
            },

            {
              data: this.state.boyUpperHeights.slice(this.state.months[0]),
              label: "Upper Boy Threshold",
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
              data: this.state.girlUpperHeights.slice(this.state.months[0]),
              label: "Upper Girl Threshold",
              backgroundColor: "rgba(69, 179, 157,0)",
              borderColor: "rgba(52, 73, 94 ,0.5)",
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          //Customize chart options
          legend: { position: "bottom" },
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
          <div className="vertical-center">
            <img src={image} alt="Loading"></img>
            <h1 className="horizontal-center">Loading</h1>
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
            <div className="flex-grow-1">
              <h1 className="baby-details-heading">Baby Detail</h1>
            </div>
            <div className="ml-auto p-2">
              {this.state.status === "Undefined" && (
                <h2 className="badge-pill badge-light status-message">
                  Status:{" "}
                  <span style={{ color: "#AF7AC5", fontWeight: "bold" }}>
                    Never Scanned
                  </span>
                </h2>
              )}
              {this.state.status === "Critical" && (
                <h2 className="badge-pill badge-light p-2 status-message">
                  Status:{" "}
                  <span style={{ color: "#DD1010  ", fontWeight: "bold" }}>
                    {this.state.status}
                  </span>
                </h2>
              )}
              {this.state.status === "Fair" && (
                <h2 className="badge-pill badge-light p-2 status-message">
                  Status:{" "}
                  <span style={{ color: "#DC7633", fontWeight: "bold" }}>
                    {this.state.status}
                  </span>
                </h2>
              )}
              {this.state.status === "Serious" && (
                <h2 className="badge-pill badge-light p-2 status-message">
                  Status:{" "}
                  <span style={{ color: "#E33D19", fontWeight: "bold" }}>
                    {this.state.status}
                  </span>
                </h2>
              )}
              {this.state.status === "Normal" && (
                <h2 className="badge-pill badge-light p-2 status-message">
                  Status:{" "}
                  <span style={{ color: "#58D68D", fontWeight: "bold" }}>
                    {this.state.status}
                  </span>
                </h2>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-7 baby-card">
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
            <div className="col boxes issue-card">
              <div className="col-md-12 ">
                <div className="col-md-12 ">
                  <div className="pt-2 baby-details-heading">
                    <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                      Issues ᛫
                    </span>{" "}
                    {this.state.currentAlert.date !== undefined && (
                      <span
                        className="text-muted pl-1"
                        style={{ fontSize: "20px" }}
                      >
                        As of{" "}
                        {moment(this.state.currentAlert.date).format(
                          "dddd Do MMMM, YYYY"
                        )}
                      </span>
                    )}
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
                      </div>
                    )}
                  {this.state.currentAlert.normal !== undefined && (
                    <div>
                      <hr />
                      <div className="row mt-1">
                        <div className="col-sm-2">
                          <img src={successIcon} alt="icon" />
                        </div>
                        <div className="col-sm-10">
                          {this.state.currentAlert.normal}
                        </div>
                      </div>
                    </div>
                  )}
                  {this.state.status === "Undefined" && (
                    <div className="baby-details-heading">
                      <hr />
                      <h4>No Issues to display</h4>
                      <hr />
                      <h5>Please have the baby scanned as soon as possible</h5>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {this.state.metrics.length > 0 && (
            <a
              href={`/baby/${this.state.babies._id}/pictures`}
              className="btn btn-primary mt-3 mr-4"
            >
              <FaRegImages className="mr-2" />
              View Pictures
            </a>
          )}
          <AnchorLink href="#charts" className="btn btn-outline-success mt-3">
            <AiOutlineLineChart className="mr-2" />
            View Charts
          </AnchorLink>

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
            <div>
              <hr />
              <h1 className="mt-4 mb-4">
                There are no available metrics for this baby
              </h1>
              <br />
              <hr />
              <br />
            </div>
          )}
          <div id="charts">
            <h1>Charts</h1>
            <div className="mb-5">
              <div className="">
                <div className="col-md-12 chart">
                  <h4 className="chart-heading">Baby Age Against Weight</h4>
                  <hr />
                  <canvas
                    id="weightChart"
                    className="chart-resp"
                    ref={this.weightChart}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="chart">
                  <h4 className="chart-heading">Baby Age Against Height</h4>
                  <hr />
                  <canvas
                    id="heightChart"
                    className="chart-resp"
                    ref={this.heightChart}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 mb-5">
              <div className="col-md-6 ">
                <div className="col-md-12 chart">
                  <h4 className="chart-heading">Skin Issues</h4>

                  <hr />
                  <canvas
                    id="issueChart"
                    className="chart-resp"
                    ref={this.issueChart}
                  />
                </div>
              </div>

              <div className="col-md-6 pad-chart">
                <div className="col-md-12 chart">
                  <h4 className="chart-heading">
                    Baby Age Against Temperature in °C
                  </h4>
                  <hr />
                  <canvas
                    id="temperatureChart"
                    className="chart-resp"
                    ref={this.tempreatureChart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default babyDetails;
