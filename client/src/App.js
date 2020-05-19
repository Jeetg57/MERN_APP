import React from "react";
import "./App.css";
import AllResults from "./components/results/AllResults";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import OCR from "./components/OCR/OCR";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import UserDetail from "./components/auth/UserDetail";
import editUser from "./components/auth/editUser";
import MetricInput from "./components/MetricInputs/MetricInput";
import four0four from "./components/404/four0four";
import About from "./components/about/About";
import babyRegistration from "./components/BabyInfo/babyRegistration";
import babyDash from "./components/dashboard/babyDash";
import babyDetails from "./components/BabyInfo/babyDetails";
import successRegistered from "./components/BabyInfo/successRegistered";
import babyPictures from "./components/BabyInfo/babyPictures";
import OneSignal from "react-onesignal";
function App() {
  OneSignal.initialize("ff08e594-8a6a-477c-a8ca-b14495e9a6e6");

  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard" exact component={babyDash} />
        <Route path="/ocr" exact component={OCR} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/details" exact component={AllResults} />
        <Route path="/details/upload" exact component={MetricInput} />
        <Route path="/user/edit/:id" component={editUser} />
        <Route path="/user/profile" component={UserDetail} />
        <Route path="/about" component={About} />
        <Route path="/babyRegistration" exact component={babyRegistration} />
        <Route
          path="/babyRegistration/success/:id"
          component={successRegistered}
        />
        <Route path="/baby/:id" exact component={babyDetails} />
        <Route path="/baby/:id/pictures" exact component={babyPictures} />
        <Route path="*" component={four0four} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
