import { Request } from "tedious";
import { sendBillQuery, userExists } from "../../sqlQuery";
import { queryDatabase } from "../../database";
import billValidations from "../../validations/bill";

import Line from "../line";

const send = async (req, res) => {
  try {
    const { body } = req;

    // check user input validation
    const validated = billValidations.send(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    const verifyUser = new Request(
      userExists(body),
      (error, rowCount) => {
        if (error) res.status(500).json({ message: error });
        else {
          if (rowCount === 1) {
            const request = new Request(sendBillQuery(body), (err, row) => {
              if (err)
                return res
                  .status(404)
                  .json({ message: "Store Bill failed.", error: err });
              else {
                Line.lineNotification(body);
                res.status(200).json({ message: "Bill is stored" });
              }
            });

            queryDatabase(request);
          } else {
            res
              .status(404)
              .json({ message: "User is not in the organization" });
          }
        }
      }
    );

    queryDatabase(verifyUser);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default send;
