import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { Request } from "tedious";
import { userExists } from "../sqlQuery";
import { queryDatabase } from "../database";

// Authenticate registeration request
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => done(null, req)
  )
);

// Authenticate login request
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, username, password, done) => done(null, req)
  )
);

// Authenticate JWT request
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
      issuer: "mana-api-server",
      audience: "mana-admin",
    },
    (jwtPayload, done) => {
      const verify = new Request(
        userExists({ userId: jwtPayload.username }),
        (error, rowCount) => {
          if (error) res.status(500).json({ message: error });
          else {
            if (rowCount === 1) done(null, true);
            else done(null, false);
          }
        }
      );

      queryDatabase(verify);
    }
  )
);

export default passport;
