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
class babyDash extends Component {
  constructor() {
    super();
    this.state = {
      babies: [],
      received: false,
      columns: [],
      data: [],
      message: "",
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
        this.setState({ babies: response.data, received: true });
      })
      .catch((err) => {
        console.log(err.response.data);
        this.setState({ message: err.response.data });
      });
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
    } else {
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
        </div>
      );
    }
  }
}

export default babyDash;
