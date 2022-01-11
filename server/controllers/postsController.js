const Post = require("../models/postsModel");
const Comment = require("../models/commentsModel");

/* Controller for all post methods*/

const getPosts = (req, res) => {
  Post.find()
    .sort([["timestamp", "descending"]])
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "username",
        select: "username",
      },
    })
    .exec((err, posts) => {
      if (err) {
        return res.status(404).json("No author");
      }
      res.status(200).json(posts);
    });
};

const getPost = async (req, res) => {
  Post.findById(req.params.id)
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: {
        path: "username",
        select: "username",
      },
    })
    .exec((error, post) => {
      if (error) {
        res.json(error);
      }
      res.status(200).json(post);
    });
};

const createPost = (req, res) => {
  Post.create(
    {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      author: req.user._id,
      comments: req.body.comments,
      published: false,
      timestamp: Date.now(),
      imgUrl: req.body.imgUrl,
    },
    (err, post) => {
      if (err) {
        return res.status(500).json("Could not make post");
      }
      post.populate("author", (err, newPost) => {
        if (err) {
          return res.json("Could not find author");
        }
        res.status(201).json(newPost);
      });
    }
  );
};

const editPost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      imgUrl: req.body.imgUrl,
    }
  )
    .then(() => {
      res.status(200).json({ msg: "Sucessfully updated" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
const deletePost = (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).json({ msg: "Post not found" });
      } else {
        res.status(200).json({ msg: "Post successfully deleted" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

const publishPost = async (req, res) => {
  new Post.findByIdAndUpdate(
    { _id: req.params.id },
    { published: true },
    (error, post) => {
      if (error) {
        res.json(error);
      }
      res.status(200).json({ msg: "Sucessfully published" });
    }
  );
};
const unpublishPost = async (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { published: false },
    (error, post) => {
      if (error) {
        res.json(error);
      }
      res.status(200).json({ msg: "Sucessfully unpublished" });
    }
  );
};

const likePost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $push: { likes: req.body.user_id } },
    { new: true },
    (error, post) => {
      if (error) {
        return res.json(error);
      }
      return res.json(post.likes);
    }
  );
};

const unlikePost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.params.id },
    { $pull: { likes: req.body.user_id } },
    { new: true },
    (error, post) => {
      if (error) {
        return res.json(error);
      }
      return res.json(post.likes);
    }
  );
};

/* Controller for all comment methods */
const addComment = async (req, res) => {
  console.log(req.body.commentContent);
  const comment = new Comment({
    username: req.user._id,
    commentContent: req.body.commentContent,
    timestamp: Date.now(),
  });
  await comment.save();
  Post.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { comments: { $each: [comment], $position: 0 } } },
    (error, post) => {
      if (error) {
        res.status(500).json(error);
      }
      console.log(req.params.id);
      res.status(200).json(post);
    }
  );
};
exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePost = deletePost;
exports.publishPost = publishPost;
exports.unpublishPost = unpublishPost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.addComment = addComment;
