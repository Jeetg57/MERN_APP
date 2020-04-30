import React, { useEffect, useState } from "react";
import axios from "axios";
import myImg from "./loading.gif";
function VisualRecognitionIdentify({ match }) {
  let [image, setImage] = useState({});
  let [result, setResult] = useState({});

  useEffect(() => {
    const getPhotos = async () => {
      try {
        await axios
          .get(`/images/${match.params.imageId}`, {
            headers: { "auth-token": localStorage.getItem("auth-token") },
          })
          .then((response) => {
            const image = response.data;
            setImage(image);
            console.log(image);
            getVisualRecognitionInfo(image.path);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getPhotos();
  }, [match.params.imageId]);

  const getVisualRecognitionInfo = async (path) => {
    try {
      await axios
        .get(`/results/test/${path}`, {
          headers: { "auth-token": localStorage.getItem("auth-token") },
        })
        .then((response) => {
          const result = response.data.images[0].classifiers[0].classes[0];
          setResult(result);
          console.log(result);
        });
    } catch (err) {
      console.log(err);
    }
  };
  if (result.class === undefined || result.score === undefined) {
    return (
      <div className="container">
        <h1>Image to be scanned</h1>
        <img src={`../${image.path}`} width="300px" alt=""></img>
        <br></br>
        <img src={myImg} alt="Baby"></img>
        <h4>Scanning...</h4>
        <p>
          If this loading takes too long, it means you might have used an
          invalid pic. You can either reload, or use another picture
        </p>
      </div>
    );
  } else {
    return (
      <div className="container mt-4">
        <img src={`../${image.path}`} width="300px" alt=""></img>
        <h3>The baby has been identified with {result.class}</h3>
        <h3>{result.score * 100}% sure</h3>
      </div>
    );
  }
}

export default VisualRecognitionIdentify;
