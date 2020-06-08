import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import four0four from "./components/404/four0four";
import About from "./components/about/About";
import editUser from "./components/auth/editUser";
import Login from "./components/auth/Login";
import registerSuccess from "./components/auth/registerSuccess";
import Signup from "./components/auth/Signup";
import UserDetail from "./components/auth/UserDetail";
import babyDetails from "./components/BabyInfo/babyDetails";
import babyPictures from "./components/BabyInfo/babyPictures";
import babyRegistration from "./components/BabyInfo/babyRegistration";
import successRegistered from "./components/BabyInfo/successRegistered";
import babyDash from "./components/dashboard/babyDash";
import MetricInput from "./components/MetricInputs/MetricInput";
import OCR from "./components/OCR/OCR";
import Home from "./Home";
import Child from "./components/privacy-policy/child";
import Main from "./components/privacy-policy/main";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/dashboard" exact component={babyDash} />
        <Route path="/ocr" exact component={OCR} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signup/success" exact component={registerSuccess} />
        <Route path="/login" exact component={Login} />
        <Route path="/details/upload" exact component={MetricInput} />
        <Route path="/user/edit/:id" component={editUser} />
        <Route path="/user/profile" exact component={UserDetail} />
        <Route path="/about" exact component={About} />
        <Route path="/babyRegistration" exact component={babyRegistration} />
        <Route path="/privacy-policy/main" exact component={Child} />
        <Route path="/privacy-policy/child" exact component={Main} />
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
