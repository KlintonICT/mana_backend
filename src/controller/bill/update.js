import { Request } from "tedious";
import { updateBillQuery } from "../../sqlQuery";
import { queryDatabase } from "../../database";
import billValidations from "../../validations/bill";

const update = async (req, res) => {
  try {
    const { body } = req;

    // check user input validation
    const validated = billValidations.update(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    // update bill
    const request = new Request(updateBillQuery(body), (error, rowCount) => {
      if (error)
        return res
          .status(404)
          .json({ message: "Update Bill failed.", error: error });
      else res.status(200).json({ message: "Bill is updated" });
    });

    queryDatabase(request);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default update;
