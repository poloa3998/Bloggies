import { useContext, useEffect, useState, useRef } from "react";
import { PostContext } from "../context/postContext";
import { useParams } from "react-router";
import CommentSection from "../Components/comments/commentSection";
import lottie from "lottie-web";
import loadingAnimation from "../assets/images/loadingAnimation.json";
import testImg from "../assets/images/blogging.png";
import DOMPurify from "dompurify";
import ReactHtmlParser from "react-html-parser";
import { DateTime } from "luxon";
import { AiFillHeart } from "react-icons/ai";

const Post = () => {
  const { postId } = useParams();
  const {
    post,
    likes,
    liked,
    setPost,
    setLiked,
    getPost,
    likePost,
    unlikePost,
  } = useContext(PostContext);

  const [isLoading, setisLoading] = useState(true);
  const container = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    setisLoading(true);
    lottie.loadAnimation({
      container: container.current,
      animationData: loadingAnimation,
    });
    getPost(postId);

    setTimeout(() => setisLoading(false), 2000);

    return () => setPost({});
  }, [getPost, postId, setPost]);

  const handleLikes = () => {
    if (!liked) {
      likePost(postId);
    } else {
      unlikePost(postId);
    }
  };
  return (
    <>
      {isLoading && <div className="w-screen h-screen" ref={container}></div>}

      {!isLoading && post.author.commentContent === undefined && (
        <section>
          {/*Title*/}
          <div className=" flex flex-col items-center gap-5 text-center pt-16 md:pt-12">
            <h1 className="container max-w-4xl font-bold break-normal text-3xl md:text-5xl">
              {post.title}
            </h1>

            <p className="text-sm md:text-base text-rose-400 font-bold">
              {post.author.username}{" "}
              {DateTime.fromISO(post.timestamp).toLocaleString({
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/*image*/}
          <div className="container w-full max-w-3xl mx-auto bg-white bg-cover mt-8 rounded">
            <img src={testImg} alt="test" />
          </div>

          {/*Container*/}
          <div className="container max-w-5xl mx-auto">
            <div className="mx-0 sm:mx-6">
              <div className="bg-white w-full leading-loose p-8 md:p-24 text-xl md:text-2xl text-gray-800">
                {ReactHtmlParser(DOMPurify.sanitize(post.content))}
                {/* Post Content */}
                <div className="flex items-center gap-1 mt-10">
                  <AiFillHeart
                    className={
                      liked ? " like-btn liked" : " like-btn not-liked"
                    }
                    onClick={() => {
                      handleLikes();
                      setLiked(!liked);
                    }}
                  />
                  {likes.length}
                </div>
                <div className="text-base pt-5">
                  <CommentSection />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
