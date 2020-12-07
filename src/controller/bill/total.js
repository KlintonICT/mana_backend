import { Request } from "tedious";
import { getTotalDiffQuery } from "../../sqlQuery";
import { queryDatabase } from "../../database";

const getTotalDiff = async (req, res) => {
  try {
    const request = new Request(getTotalDiffQuery(), (error, rowCount) => {
      if (error) res.status(500).json({ message: error });
      else
        rowCount <= 0
          ? res.status(200).json({ message: "No records found" })
          : console.log("Records found");
    });

    let data = [];

    request.on("row", (columns) => {
      data.push(filterResult(columns));
    });

    request.on("doneInProc", (rowCount, more, rows) => {
      res.status(200).json({ data });
    });

    queryDatabase(request);
  } catch (err) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

const filterResult = (columns) => {
  let filteredData = {};
  columns.forEach((column) => {
    const value = column.value;
    const name = column.metadata.colName;
    switch (name) {
      case "total":
        filteredData.total = value;
        break;
      case "posSum":
        filteredData.posSum = value;
        break;
      case "diff":
        filteredData.diff = value;
        break;
      default:
        filteredData.datetime = value;
    }
  });

  return filteredData;
};

export default getTotalDiff;
