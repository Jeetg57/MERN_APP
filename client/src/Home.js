import React, { Component } from "react";
import babyImg from "./assets/homepage-baby.png";
import arduino from "./assets/arduino.jpg";
import { FaReact } from "react-icons/fa";

class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="row">
          <div className="col text-content">
            <h1 className="head">Envision the future</h1>
            <h2 className="head2">
              Enhancing Healthcare Through Remote Infant Screening
            </h2>
            <a href="/login" className="btn btn-outline-info">
              Login/Register
            </a>
          </div>
          <div className="col">
            <img src={babyImg} className="w-100" alt="Baby kissed"></img>
          </div>
        </div>
        <div className="section-one">
          <h1 className="text-center">What we do</h1>

          <div className="row">
            <div className="col">
              <img className="w-100" src={arduino} alt="Arduino"></img>
            </div>
            <div className="col text-section text-content">
              <h2>
                We work with IoT(Internet of Things) and Machine Learning to
                create easy-to-use technology which helps mothers easily measure
                baby metrics such as height, weight, temperature, and skin
                issues among others
              </h2>
            </div>
          </div>
        </div>
        <footer className="page-footer">
          <div className="row ">
            <div class="col">
              <h3>
                You can find us at the United States International University -
                Africa.
              </h3>
            </div>
            <div class="col">
              <h5 class="text-uppercase font-weight-bold mb-4">Useful Links</h5>
              <ul class="list-unstyled">
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a
                    href="https://www.usiu.ac.ke/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Our University
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-right">
            Made With React JS
            <span className="ml-2" style={{ fontSize: "30px" }}>
              <FaReact></FaReact>
            </span>
          </p>
        </footer>
      </div>
    );
  }
}
export default Home;
