const express = require("express");
require("dotenv/config");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const resultRoute = require("./routes/results");
const port = process.env.PORT || 3000;
app.use("/results", resultRoute);

const imageRoute = require("./routes/upload");
app.use("/images", imageRoute);
app.use(express.static(__dirname + "/uploads/"));

//connect to db

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

//Serve Static assets if in production
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  app.get("*", (req,res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
  );
}

app.listen(port);
