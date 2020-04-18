import React, { useEffect, useState } from "react";
import axios from "axios";
function VisualRecognitionIdentify({ match }) {
  useEffect(() => {
    getPhotos();
  }, []);

  let [image, setImage] = useState({});

  const getPhotos = async () => {
    try {
      await axios.get(`/images/${match.params.imageId}`).then((response) => {
        const image = response.data;
        setImage(image);
        console.log(image);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>{image.filename}</h1>
      <img src={image.path} width="300px"></img>
    </div>
  );
}

export default VisualRecognitionIdentify;
