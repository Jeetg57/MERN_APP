import * as d3 from "d3";
import csvFile from "./height-threshold.csv";
import weightFile from "./weight-threshold.csv";
const generateAlert = (metric, birthday) => {
  var d = new Date(birthday);
  var scanDate = new Date(metric.date);
  const diffTime = Math.abs(scanDate - d);
  const diffMonths = Math.ceil(diffTime / 2592000000);
  var issueArray = [];
  d3.csv(csvFile).then(function (data) {
    data.map((row) => {
      if (Number(row.Age) === Number(diffMonths)) {
        let lesserComparison = row.Boys - 2;
        let higherComparision = Number(row.Boys) + 2;
        if (
          metric.height >= lesserComparison &&
          metric.height <= higherComparision
        ) {
          console.log("normal height");
        } else {
          let string =
            "Baby height at this age is supposed to be between " +
            lesserComparison +
            " and " +
            higherComparision +
            ". But instead it is at " +
            metric.height;
          let item = { issue: string };
          issueArray.push(item);
        }
      }
      return true;
    });
  });
  d3.csv(weightFile).then(function (data) {
    data.map((row) => {
      if (Number(row.Age) === Number(diffMonths)) {
        let lesserComparison = row.Boys - 200;
        let higherComparison = Number(row.Boys) + 200;
        if (
          metric.weight >= lesserComparison &&
          metric.weight <= higherComparison
        ) {
          console.log("normal weight");
        } else {
          let string =
            "Baby weight at this age is supposed to be between " +
            lesserComparison +
            " and " +
            higherComparison +
            ". But instead it is at " +
            metric.weight;
          let item = { issue: string };
          issueArray.push(item);
        }
      }
    });
  });
  if (metric.temperature < 35.5 && metric.temperature > 37.5) {
    let string =
      "Baby weight at this age is supposed to be between " +
      35.5 +
      " and " +
      37.5 +
      ". But instead it is at " +
      metric.temperature;
    let item = { issue: string };
    issueArray.push(item);
  }
  if (metric.issue === "Rash") {
    let string = "Baby has been identified with rash";
    let item = { issue: string };
    issueArray.push(item);
  }
  return issueArray;
};

export default generateAlert;
