import jwt from "jsonwebtoken";

const generateJwtToken = (userObject) =>
  jwt.sign({ username: userObject.username }, process.env.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: "10y",
    issuer: "mana-api-server",
    audience: "mana-admin",
  });

export default generateJwtToken;
