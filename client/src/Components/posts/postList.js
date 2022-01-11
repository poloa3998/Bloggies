import { useState, useEffect, useContext } from "react";

import { PostContext } from "../../context/postContext";
import PostCard from "./postCard";

const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    getPosts();
    setisLoading(false);
  }, [getPosts]);

  return (
    <section>
      <p className="font-Courgette text-5xl text-rose-400 text-center font-bold my-10 underline  underline-offset-[6px]">
        Recent Posts
      </p>
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col ">
        {isLoading
          ? null
          : posts.map((post) => {
              return (
                <div key={post._id}>
                  <PostCard
                    title={post.title}
                    excerpt={post.excerpt}
                    author={post.author.username}
                    id={post._id}
                  />
                </div>
              );
            })}
      </div>
    </section>
  );
};

export default PostList;
