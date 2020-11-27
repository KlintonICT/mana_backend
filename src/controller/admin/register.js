import { Request } from "tedious";
import { createAdminQuery, userExists } from "../../sqlQuery";
import { queryDatabase } from "../../database";
import adminValidation from "../../validations/admin";
import bcrypt from "bcrypt";

const register = async (req, res, next) => {
  try {
    const { body } = req;

    // check user input validation
    const validated = adminValidation.register(body);
    if (typeof validated === "object")
      return res.status(500).json({ message: validated });

    const verifyUser = new Request(
      userExists({ userId: body.username }),
      (error, rowCount) => {
        if (error) res.status(500).json({ message: error });
        else {
          if (rowCount === 1) {
            res.status(404).json({ message: "This admin already exists." });
          } else {
            // hash password
            bcrypt.genSalt(10, (saltErr, salt) => {
              if (saltErr) return next(saltErr);
              bcrypt.hash(
                body.password,
                salt,
                function (hashErr, hashedPassword) {
                  if (hashErr) return next(hashErr);

                  // store admin
                  const request = new Request(
                    createAdminQuery(body, hashedPassword),
                    (err, row) => {
                      if (err)
                        return res.status(404).json({
                          message: "Admin registeration failed",
                          error: err,
                        });
                      else
                        res
                          .status(200)
                          .json({ message: "Admin successfully registered." });
                    }
                  );

                  queryDatabase(request);
                }
              );
            });
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

export default register;
