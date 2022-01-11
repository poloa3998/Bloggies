import { useContext, useEffect } from "react";
import { PostContext } from "../../context/postContext";
import { useParams } from "react-router";
import Comment from "./comment";
import NewComment from "./newComment";
const CommentSection = () => {
  const { postId } = useParams();
  const { comments, getComments } = useContext(PostContext);

  useEffect(() => {
    getComments(postId);
  }, [getComments, postId]);
  return (
    <div className="flex flex-col gap-4 pt-5">
      Comments({comments.length})
      <NewComment />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            username={comment.username.username}
            content={comment.commentContent}
            published={comment.timestamp}
          />
        );
      })}
    </div>
  );
};

export default CommentSection;
