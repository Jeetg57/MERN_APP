const express = require("express");
require("dotenv/config");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const port = process.env.PORT || 5000;
const authRoute = require("./routes/auth");
app.use(express.static(__dirname + "/uploads/"));
const OCR_Route = require("./routes/OCR");
const userRoute = require("./routes/users");
const metricRoute = require("./routes/metric");
app.use("/metric", metricRoute);
app.use("/users", userRoute);
app.use("/ocr", OCR_Route);
app.use("/user", authRoute);
//connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log("connected to DB")
);

//Serve Static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port);
