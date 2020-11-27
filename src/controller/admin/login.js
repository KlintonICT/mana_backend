import bcrypt from "bcrypt";
import generateToken from "../../utils/helper/generateToken";
import { Request } from "tedious";
import { adminLoginQuery, userExists } from "../../sqlQuery";
import { queryDatabase } from "../../database";
import adminValidation from "../../validations/admin";

const login = (req, res, next) => {
  try {
    const { body } = req;
    // check user input validation
    const validated = adminValidation.login(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    const verifyUser = new Request(
      userExists({ userId: body.username }),
      (error, rowCount) => {
        if (error) res.status(500).json({ message: error });
        else {
          if (rowCount === 0)
            res.status(404).json({ message: "The admin does not exists." });
          else {
            const request = new Request(
              adminLoginQuery(body),
              (err, rowCounts) => {
                if (err) res.status(500).json({ message: err });
                else if (rowCounts === 0)
                  res.status(404).json({ message: "No user founds." });
              }
            );

            let password;
            request.on("row", (columns) => {
              password = columns[0].value;
            });

            request.on("doneInProc", function (countRow, more, rows) {
              bcrypt.compare(body.password, password, function (err, result) {
                if (err) res.status(404).json({ message: err });
                if (result) {
                  const token = generateToken({ username: body.username });
                  res.status(200).json({ token: token });
                } else res.status(404).json({ message: "The password is not correct" });
              });
            });

            queryDatabase(request);
          }
        }
      }
    );
    queryDatabase(verifyUser);
  } catch (err) {
    console.log("Error", error);
    return res.status(500).json({ message: "Oops! Something went wrong!" });
  }
};

export default login;
