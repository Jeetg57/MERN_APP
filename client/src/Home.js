import React, { Component } from "react";
import babyImg from "./assets/homepage-baby.png";
import arduino from "./assets/arduino.jpg";
import { FaReact } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
AOS.init();

class Home extends Component {
  render() {
    // var scroll = new SmoothScroll();
    // var anchor = document.querySelector("#section_one");
    // var options = { speed: 1000, easing: "easeOutCubic" };
    // scroll.animateScroll(anchor, toggle, options);
    return (
      <div className="homepage">
        <div className="row">
          <div
            className="col text-content"
            data-aos="fade-in"
            data-aos-delay="80"
            data-aos-duration="1000"
            data-aos-easing="ease-in-quart"
          >
            <h1 className="head">Envision the future</h1>
            <h2 className="head2">
              Enhancing Healthcare Through Remote Infant Screening
            </h2>

            <br />
            <AnchorLink
              href="#section_one"
              style={{ color: "black" }}
              className="horizontal-center bounce"
            >
              <FaChevronDown style={{ fontSize: "40px" }} className="mt-5" />
            </AnchorLink>
          </div>
          <div className="col">
            <img src={babyImg} className="w-100" alt="Baby kissed"></img>
          </div>
        </div>
        <div className="section-one" id="section_one">
          <h1 className="text-center">What we do</h1>
          <div
            className="row mt-4"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            anchorPlacement="top-bottom"
          >
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
        <div className="section-one" id="section_one">
          <h1 className="text-center">What you can do</h1>
          <div
            className="row mt-4"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            anchorPlacement="top-bottom"
          >
            <div className="col">
              <img
                className="w-100"
                src="https://images.pexels.com/photos/2182979/pexels-photo-2182979.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Arduino"
              ></img>
            </div>
            <div className="col text-section text-content">
              <h2>
                Help out the babies. If you are a doctor, you can see the status
                of various babies from different locations and give them help
              </h2>
            </div>
          </div>

          <div
            className="row mt-4"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            anchorPlacement="top-bottom"
          >
            <div className="col text-section text-content">
              <h2>
                Use our data, analyze it further and give more meaning to it
              </h2>
            </div>
            <div className="col">
              <img
                className="w-100"
                src="https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?cs=srgb&dl=person-holding-blue-ballpoint-pen-on-white-notebook-669610.jpg&fm=jpg"
                alt="Arduino"
              ></img>
            </div>
          </div>

          <div
            className="row mt-4"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            anchorPlacement="top-bottom"
          >
            <div className="col">
              <img
                className="w-100"
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Arduino"
              ></img>
            </div>
            <div className="col text-section text-content">
              <h2>
                Become our partner and help save the babies of the new
                generation{" "}
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
