import { useContext } from "react";

import { PostContext } from "../context/postContext";
import PostCard from "../Components/posts/postCard";

const Dashboard = () => {
  const { posts } = useContext(PostContext);
  return (
    <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
      published Posts
      {posts
        .filter(
          (post) =>
            post.author.username === localStorage.getItem("user") &&
            post.published
        )
        .map((post) => {
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
      Unpublished Posts
      {posts
        .filter(
          (post) =>
            post.author.username === localStorage.getItem("user") &&
            !post.published
        )
        .map((post) => {
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
  );
};

export default Dashboard;
