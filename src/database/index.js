import { Connection } from "tedious";
import { config } from "../config/database";

export const queryDatabase = (request) => {
  const db = new Connection(config);

  db.connect((error) => {
    if (error) console.log(error);
    else db.execSql(request);
  });
};
