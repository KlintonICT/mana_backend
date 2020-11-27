import express from "express";
import passport from "../utils/passport";
import Admin from "../controller/admin";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  Admin.register
);

router.post(
  "/login",
  passport.authenticate("local-login", { session: false }),
  Admin.login
);

export default router;
