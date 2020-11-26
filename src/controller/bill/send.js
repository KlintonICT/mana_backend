import { Request } from "tedious";
import { sendBillQuery } from "../../sqlQuery";
import { queryDatabase } from "../../database";
import billValidations from "../../validations/bill";

const send = async (req, res) => {
  try {
    const { body } = req;

    // check user input validation
    const validated = billValidations.send(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    // save bill
    const request = new Request(sendBillQuery(body), (error, rowCount) => {
      if (error)
        return res
          .status(404)
          .json({ message: "Store Bill failed.", error: error });
      else res.status(200).json({ message: "Bill is stored" });
    });

    queryDatabase(request);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default send;