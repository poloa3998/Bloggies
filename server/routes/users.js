const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    
    res.status(200).json({ success: true, msg: "You are logged in!" });
  }
);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);

router.post("/register", userController.registerUser);

router.post("/login", userController.login);

module.exports = router;
