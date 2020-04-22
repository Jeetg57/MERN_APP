import React from "react";
import "./App.css";
import VisualRecognition from "./VisualRecognition";
import VisualRecognitionModel from "./VisualRecognitionModel";
import VisualRecognitionIdentify from "./VisualRecognitionIdentify";
import AllResults from "./AllResults";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/upload" component={VisualRecognitionModel} />
        <Route path="/info" component={VisualRecognition} />
        <Route path="/results" exact component={AllResults} />
        <Route path="/:imageId" component={VisualRecognitionIdentify} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}
export default App;
