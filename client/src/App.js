import React from "react";
import "./App.css";
import VisualRecognition from "./VisualRecognition";
import VisualRecognitionModel from "./VisualRecognitionModel";
function App() {
  return (
    <div className="App">
      <header className="App-header container mt-4">
        <VisualRecognition />
        <VisualRecognitionModel />
      </header>
    </div>
  );
}

export default App;
