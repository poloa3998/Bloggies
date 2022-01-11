const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const passport = require("passport");
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({
      success: true,
      msg: "You are logged in on posts!",
      user: req.user._id,
    });
  }
);
router.get("/", postsController.getPosts);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  postsController.createPost
);

router.get("/:id", postsController.getPost);

router.post(
  "/:id/comments",
  passport.authenticate("jwt", { session: false }),
  postsController.addComment
);
router.post(
  "/:id/publish",
  passport.authenticate("jwt", { session: false }),
  postsController.publishPost
);

router.post(
  "/:id/unpublish",
  passport.authenticate("jwt", { session: false }),
  postsController.unpublishPost
);
router.put(
  "/:id/like",
  passport.authenticate("jwt", { session: false }),
  postsController.likePost
);

router.put(
  "/:id/unlike",
  passport.authenticate("jwt", { session: false }),
  postsController.unlikePost
);

router.put(
  "/:id/edit",
  passport.authenticate("jwt", { session: false }),
  postsController.editPost
);

router.delete(
  "/:id/delete",
  passport.authenticate("jwt", { session: false }),
  postsController.deletePost
);

module.exports = router;
