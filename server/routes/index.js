const router = require("express").Router();

router.use("/api/users", require("./users"));
router.use("/api/posts", require("./posts"));

module.exports = router;
