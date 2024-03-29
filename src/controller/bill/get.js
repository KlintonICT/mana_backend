import { Request } from "tedious";
import { getBillQuery, getByBranchQuery } from "../../sqlQuery";
import { queryDatabase } from "../../database";

const get = async (req, res) => {
  try {
    const { branch } = req.query;

    const request = new Request(
      branch ? getByBranchQuery(branch) : getBillQuery(),
      (error, rowCount) => {
        if (error) res.status(500).json({ message: error });
        else
          rowCount <= 0
            ? res.status(200).json({ message: "No records found" })
            : console.log("Records found");
      }
    );

    let data = [];

    // loop for each received data row
    request.on("row", (columns) => {
      data.push(filterResult(columns));
    });

    // response when filtering data is finished
    request.on("doneInProc", (rowCount, more, rows) => {
      res.status(200).json({ data });
    });

    queryDatabase(request);
  } catch (error) {
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
      case "transacSumId":
        filteredData.transacSumId = value;
        break;
      case "transferSum":
        filteredData.transferSum = value;
        break;
      case "cashSum":
        filteredData.cashSum = value;
        break;
      case "posSum":
        filteredData.posSum = value;
        break;
      case "receiptImg":
        filteredData.receiptImg = value;
        break;
      case "branch":
        filteredData.branch = value;
        break;
      case "firstName":
        filteredData.firstName = value;
        break;
      case "lastName":
        filteredData.lastName = value;
        break;
      default:
        filteredData.datetime = value;
    }
  });

  return filteredData;
};

export default get;
