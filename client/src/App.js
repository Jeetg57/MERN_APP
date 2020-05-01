import React from "react";
import "./App.css";
import VisualRecognitionModel from "./VisualRecognitionModel";
import VisualRecognitionIdentify from "./VisualRecognitionIdentify";
import AllResults from "./AllResults";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import OCR from "./OCR";
import Signup from "./Signup";
import Login from "./Login";
import UserDetail from "./UserDetail";
import editUser from "./editUser";
import Dashboard from "./Dashboard";
import MetricInput from "./MetricInput";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/upload" exact component={VisualRecognitionModel} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/ocr" exact component={OCR} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/details" exact component={AllResults} />
        <Route path="/details/upload" exact component={MetricInput} />
        <Route path="/user/edit/:id" component={editUser} />
        <Route path="/user/:id" component={UserDetail} />
        <Route path="/image/:imageId" component={VisualRecognitionIdentify} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
