import React, { Component } from "react";
import axios from "axios";
import image from "../../assets/loading.gif";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bulma/tabulator_bulma.min.css";
import { ReactTabulator } from "react-tabulator";
import Chart from "chart.js";
import day from "dayjs";

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
      temperature: [],
      rash: 0,
      noIssues: 0,
      message: "",
    };
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
        console.log(response.data);
        this.setState({ babies: response.data });
        this.setState({ metrics: response.data.metrics });
        this.setState({ received: true });
        this.state.metrics.map((item) => {
          this.state.weights.push(item.weight);
          // var check = moment(item.date, "YYYY/MM/DD");
          // var month = check.format("MMMM");
          this.state.dates.push(item.date);
          this.state.heights.push(item.height);
          if (item.issue === "Rash") {
            this.state.rash += 1;
          } else {
            this.state.noIssues += 1;
          }
          this.state.temperature.push(item.temperature);
          return true;
        });
        this.renderChart();
        this.renderChart2();
        this.renderIssueChart();
        this.renderTemperatureChart();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ message: "No Data Found" });
      });
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
          labels: this.state.dates.sort(),
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
                type: "time",
                time: {
                  // min: this.state.babies.birthDate,
                  unit: "month",
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
    console.log(this.state.babies.birthDate);
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.weightChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.dates.sort(),
          datasets: [
            {
              label: "Weight",
              backgroundColor: "rgba(255,153,0,0.4)",
              borderColor: "rgba(255,153,0,1)",
              data: this.state.weights,
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
                type: "time",
                time: {
                  // min: this.state.babies.birthDate,
                  unit: "month",
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
          labels: this.state.dates,
          datasets: [
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
                type: "time",
                time: {
                  // min: this.state.babies.birthDate,
                  unit: "month",
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
          <h1 className="mt-4">Baby Detail</h1>
          <div className="chart mt-4 p-4 babyDetails">
            <div class="row">
              <div class="col detail_title">Registration ID</div>
              <div class="col">{this.state.babies.regId}</div>
            </div>
            <div class="row">
              <div class="col detail_title">Baby Name</div>
              <div class="col">
                {this.state.babies.firstName} {this.state.babies.lastName}
              </div>
            </div>
            <div class="row">
              <div class="col detail_title">Parent Name</div>
              <div class="col">{this.state.babies.parentName}</div>
            </div>
            <div class="row">
              <div class="col detail_title">Parent Phone</div>
              <div class="col">{this.state.babies.phoneNumber}</div>
            </div>

            <div class="row">
              <div class="col detail_title">Date Of Birth</div>
              <div class="col">
                {new Date(this.state.babies.birthDate).toDateString()}
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
          <div className="row mb-5">
            <div className="col-md-6">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">Month Against Weight</h4>
                <hr />
                <canvas id="weightChart" className="" ref={this.weightChart} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">Date Scanned Against Height</h4>
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
                  Date Scanned Against Temperature in °C
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
