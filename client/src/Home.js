import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="">
        <div className="header">
          <div>
            <div className="heading-text pt-5 pb-5 text-center jumbotron-fluid">
              <span>Enhancing Healthcare Through Remote Infant Screening</span>
            </div>
          </div>
          <div className="container">
            <h1 className="text-dark text-center mt-4">
              The Problem the project addresses
            </h1>
            <div className="row">
              <div className="col">
                <p className="text-justify">
                  In most rural areas in Kenya, access to basic child health
                  services often requires a long journey to the nearest health
                  facility. The cost of the journey in addition to the small fee
                  charged at the health facility is out of reach for most rural,
                  and financially challenged families. The net result is that
                  many families in remote rural areas do not visit health
                  facilities until it is too late. This means that many children
                  in rural areas continue to suffer from preventable health
                  related problems that would otherwise be easily monitored and
                  addressed early. ,Consequently under-5 mortality remains
                  unacceptably high. Child survival Statistics from UNICEF show
                  that under five mortality rate is 46 for every 1000 births
                  with the infant mortality rate as 34 for every 1000 births.
                  The problem is further compounded by the fact that in Kenya,
                  there are 13.8 doctors, nurses and physicians for every 10,000
                  people, less than three times the World Health Organization's
                  recommendation of 44.5.
                </p>
              </div>
              <div className="col">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/2SctSVafYBbmcVad8ga858.jpg"
                  className="w-100"
                  alt="baby"
                ></img>
              </div>
              <div>
                <h1 className="mt-3">Project Scope</h1>
                <p className="text-justify">
                  The project will focus on babies (0-9 months) who need to
                  visit the clinic almost every month for routine screening
                  tests. It can be scaled to take care of children under 5
                  years. This project seeks to address the described challenge
                  by providing community health workers and parents with
                  portable and convenient IoT device that can be used to monitor
                  growth parameters of children from rural or other marginalized
                  areas. The device will communicate with health facilities and
                  inform them of children who require immediate attention in
                  order for them to take intervention measures before it is too
                  late.
                </p>
              </div>
              <div>
                <h1 className="mt-3">Innovative aspects of the design</h1>
                <p className="text-justify">
                  The current infant screening process requires a mother to go
                  to a medical facility with their baby which is inconvenient,
                  costly and time consuming. It sometimes takes hours just to
                  get to the facility in rural areas due to bad roads. At
                  medical facilities a mother has to wait in line just to get
                  attended, if the queue is to long she has to come back the
                  next day. To address this challenge the current growth
                  monitoring process limits the monitoring to only those times
                  when a baby needs to be immunized. Monitoring growth is
                  critical especially for preterm babies or babies with special
                  needs. Such babies need close monitoring for timely
                  interventions. Our proposed solution addresses this challenges
                  by developing a solution to enable screening to be conducted
                  remotely at the infant’s home. The existing devices used to
                  screen babies require skills to use, are not portable and are
                  often too expensive for mothers to acquire. Thus they are only
                  found in the health care facilities. In order to reduce infant
                  mortality rate in rural areas and among the poor people this
                  has to change. We have come up with an IoT device that is
                  portable, affordable and easy to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
