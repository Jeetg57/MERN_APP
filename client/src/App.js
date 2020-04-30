import React from "react";
import "./App.css";
import VisualRecognition from "./VisualRecognition";
import VisualRecognitionModel from "./VisualRecognitionModel";
import VisualRecognitionIdentify from "./VisualRecognitionIdentify";
import AllResults from "./AllResults";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import OCR from "./OCR";
import Chart from "./Charts";
import Signup from "./Signup";
import Login from "./Login";
import UserDetail from "./UserDetail";
import editUser from "./editUser";
import Dashboard from "./Dashboard";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/upload" component={VisualRecognitionModel} />
        <Route path="/info" component={VisualRecognition} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/results" exact component={AllResults} />
        <Route path="/ocr" exact component={OCR} />
        <Route path="/chart" exact component={Chart} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/user/edit/:id" component={editUser} />
        <Route path="/user/:id" component={UserDetail} />
        <Route path="/image/:imageId" component={VisualRecognitionIdentify} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
