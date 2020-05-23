import React, { Component } from "react";
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from "react-toasts";
import axios from "axios";
import image from "../../assets/loading.gif";
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bulma/tabulator_bulma.min.css";
import { ReactTabulator } from "react-tabulator";
import Chart from "chart.js";

class babyDash extends Component {
  constructor() {
    super();
    this.state = {
      babies: [],
      received: false,
      columns: [],
      data: [],
      message: "",
      user: [],
      allMetrics: [],
      rash: 0,
      noIssues: 0,
      nairobi: 0,
      naivasha: 0,
      kiambu: 0,
      nakuru: 0,
      kisumu: 0,
      kakamega: 0,
      nairobiHeights: [],
      naivashaHeights: [],
      kiambuHeights: [],
      nakuruHeights: [],
      kisumuHeights: [],
      kakamegaHeights: [],
      nairobiWeights: [],
      naivashaWeights: [],
      kiambuWeights: [],
      nakuruWeights: [],
      kisumuWeights: [],
      kakamegaWeights: [],
      id: undefined,
    };
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentDidMount() {
    this.setState({
      columns: [
        { title: "_id", field: "_id", visible: false },
        {
          title: "Registration ID",
          field: "regId",
          headerFilter: "input",
        },
        {
          title: "First Name",
          field: "firstName",
          headerFilter: "input",
        },
        {
          title: "Last Name",
          field: "lastName",
          headerFilter: "input",
        },
        {
          title: "Parent Name",
          field: "parentName",
          headerFilter: "input",
        },
        {
          title: "Phone Number",
          field: "phoneNumber",
          headerFilter: "input",
        },
        {
          title: "Number Scanned",
          field: "metrics.length",
        },
      ],
    });
    this.getPhotos();
  }
  rowClick = (e, row) => {
    this.setState({ id: row.getData()._id });
    window.location = `/baby/${this.state.id}`;
  };
  getPhotos = async () => {
    await axios
      .get("/babyReg", {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        this.setState({ babies: response.data });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ message: err.response.data });
      });
    await axios
      .get(`/users/${localStorage.getItem("id")}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        this.setState({ user: response.data, received: true });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ message: err.response.data });
      });
    this.getAllBabiesData();
  };
  getAllBabiesData() {
    this.state.babies.map((baby) => {
      baby.metrics.map((metric) => {
        this.state.allMetrics.push(metric);
      });
    });
    this.getGraphData();
  }
  getGraphData() {
    this.state.allMetrics.map((item) => {
      // this.state.weights.push(item.weight);
      // this.state.dates.push(item.date);
      // this.state.heights.push(item.height);
      if (item.location === "Nairobi") {
        this.state.nairobi += 1;
        this.state.nairobiHeights.push(item.height);
        this.state.nairobiWeights.push(item.weight);
      }
      if (item.location === "Naivasha") {
        this.state.naivasha += 1;
        this.state.naivashaHeights.push(item.height);
        this.state.naivashaWeights.push(item.weight);
      }
      if (item.location === "Kiambu") {
        this.state.kiambu += 1;
        this.state.kiambuHeights.push(item.height);
        this.state.kiambuWeights.push(item.weight);
      }
      if (item.location === "Nakuru") {
        this.state.nakuru += 1;
        this.state.nakuruHeights.push(item.height);
        this.state.nakuruWeights.push(item.weight);
      }
      if (item.location === "Kisumu") {
        this.state.kisumu += 1;
        this.state.kisumuHeights.push(item.height);
        this.state.kisumuWeights.push(item.weight);
      }
      if (item.location === "Kakamega") {
        this.state.kakamega += 1;
        this.state.kakamegaHeights.push(item.height);
        this.state.kakamegaWeights.push(item.weight);
      }
      if (item.issue === "Rash") this.state.rash += 1;
      else this.state.noIssues += 1;
    });

    this.renderIssueChart();
    this.renderLocationChart();
    this.renderHeightChart();
    this.renderWeightChart();
  }
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
  weightChart = React.createRef();
  renderWeightChart = () => {
    const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const nai = arrAvg(this.state.nairobiWeights);
    const kia = arrAvg(this.state.kiambuWeights);
    const kis = arrAvg(this.state.kisumuWeights);
    const kak = arrAvg(this.state.kakamegaWeights);
    const nsa = arrAvg(this.state.naivashaWeights);
    const nak = arrAvg(this.state.nakuruWeights);

    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.weightChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "bar",
        data: {
          //Bring in data
          labels: [
            "Kakamega",
            "Kiambu",
            "Kisumu",
            "Nairobi",
            "Naivasha",
            "Nakuru",
          ],
          datasets: [
            {
              label: "Average height of baby",
              backgroundColor: [
                "rgba(0, 99, 132, 0.6)",
                "rgba(30, 99, 132, 0.6)",
                "rgba(60, 99, 132, 0.6)",
                "rgba(90, 99, 132, 0.6)",
                "rgba(120, 99, 132, 0.6)",
                "rgba(150, 99, 132, 0.6)",
                "rgba(180, 99, 132, 0.6)",
                "rgba(210, 99, 132, 0.6)",
                "rgba(240, 99, 132, 0.6)",
              ],
              borderColor: [
                "rgba(0, 99, 132, 1)",
                "rgba(30, 99, 132, 1)",
                "rgba(60, 99, 132, 1)",
                "rgba(90, 99, 132, 1)",
                "rgba(120, 99, 132, 1)",
                "rgba(150, 99, 132, 1)",
                "rgba(180, 99, 132, 1)",
                "rgba(210, 99, 132, 1)",
                "rgba(240, 99, 132, 1)",
              ],
              data: [kak, kia, kis, nai, nsa, nak],
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
                scaleLabel: {
                  display: true,
                  labelString: "Location",
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
  stackedHeightChart = React.createRef();
  renderHeightChart = () => {
    const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
    const nai = arrAvg(this.state.nairobiHeights);
    const kia = arrAvg(this.state.kiambuHeights);
    const kis = arrAvg(this.state.kisumuHeights);
    const kak = arrAvg(this.state.kakamegaHeights);
    const nsa = arrAvg(this.state.naivashaHeights);
    const nak = arrAvg(this.state.nakuruHeights);
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.stackedHeightChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "bar",
        data: {
          //Bring in data
          labels: [
            "Kakamega",
            "Kiambu",
            "Kisumu",
            "Nairobi",
            "Naivasha",
            "Nakuru",
          ],
          datasets: [
            {
              backgroundColor: [
                "#512DA8",
                "#FFA000",
                "#D32F2F",
                "#F1948A",
                "#45B39D",
                "#D35400",
              ],
              data: [kak, kia, kis, nai, nsa, nak],
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
                scaleLabel: {
                  display: true,
                  labelString: "Location",
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
    } else {
    }
  };
  locationChart = React.createRef();
  renderLocationChart = () => {
    Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
    if (this.state.received === true) {
      const myChartRef = this.locationChart.current.getContext("2d");
      new Chart(myChartRef, {
        type: "bar",
        data: {
          //Bring in data
          labels: [
            "Kakamega",
            "Kiambu",
            "Kisumu",
            "Nairobi",
            "Naivasha",
            "Nakuru",
          ],
          datasets: [
            {
              backgroundColor: [
                "#3e95cd",
                "#8e5ea2",
                "#3cba9f",
                "#e8c3b9",
                "#c45850",
                "#F7DC6F",
              ],
              data: [
                this.state.kakamega,
                this.state.kiambu,
                this.state.kisumu,
                this.state.nairobi,
                this.state.naivasha,
                this.state.nakuru,
              ],
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
                scaleLabel: {
                  display: true,
                  labelString: "Location",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Number of babies",
                },
                ticks: {
                  stepSize: 1,
                },
              },
            ],
          },
        },
      });
    } else {
    }
  };
  deleteImage(e) {
    axios
      .delete(`/babyReg/${e.target.id}`, {
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((res) => {
        ToastsStore.success(
          `Successfully deleted ${res.data.deletedCount} image`
        );
      })
      .catch((error) => {
        ToastsStore.success(`Failed to delete this image`);
      });
    this.getPhotos();
  }

  render() {
    const options = {
      pagination: "local",
      paginationSize: 20,
      initialSort: [
        { column: "regId", dir: "asc" }, //sort by this first
      ],
    };
    if (this.state.message === "Invalid Token") {
      return (
        <div className="container">
          <div className="bar error">{this.state.message}</div>
          <h3>
            Your login has expired. Click <a href="/login">here</a> to login
            again
          </h3>
        </div>
      );
    }
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
    } else if (
      this.state.user.job_title === "Doctor" ||
      this.state.user.job_title === "Admin"
    ) {
      return (
        <div className="p-5">
          <h1>All Babies</h1>
          <ReactTabulator
            options={options}
            ref={(ref) => (this.ref = ref)}
            data={this.state.babies}
            columns={this.state.columns}
            tooltips={true}
            layout={"fitData"}
            rowClick={this.rowClick}
          />

          <ToastsContainer
            store={ToastsStore}
            position={ToastsContainerPosition.TOP_RIGHT}
          />

          <div className="container">
            <h1 className="mt-4">Data Analytics</h1>
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
                  <h4 className="chart-heading">Babies per Location</h4>

                  <hr />
                  <canvas
                    id="issueChart"
                    className=""
                    ref={this.locationChart}
                  />
                </div>
              </div>
            </div>
            <div className="row mt-4 mb-5">
              <div className="col-md-6 ">
                <div className="col-md-12 chart">
                  <h4 className="chart-heading">
                    Average Height against Location
                  </h4>

                  <hr />
                  <canvas
                    id="issueChart"
                    className=""
                    ref={this.stackedHeightChart}
                  />
                </div>
              </div>
              <div className="col-md-6 ">
                <div className="col-md-12 chart">
                  <h4 className="chart-heading">
                    Average Weight against Location
                  </h4>

                  <hr />
                  <canvas id="issueChart" className="" ref={this.weightChart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1 className="mt-4"> Welcome, {this.state.user.firstname}</h1>
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
                <h4 className="chart-heading">Babies per Location</h4>

                <hr />
                <canvas id="issueChart" className="" ref={this.locationChart} />
              </div>
            </div>
          </div>
          <div className="row mt-4 mb-5">
            <div className="col-md-6 ">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">
                  Average Height against Location
                </h4>

                <hr />
                <canvas
                  id="issueChart"
                  className=""
                  ref={this.stackedHeightChart}
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <div className="col-md-12 chart">
                <h4 className="chart-heading">
                  Average Weight against Location
                </h4>

                <hr />
                <canvas id="issueChart" className="" ref={this.weightChart} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default babyDash;
