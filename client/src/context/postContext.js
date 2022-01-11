import React, { useState, useContext, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const PostContext = React.createContext();

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  let navigate = useNavigate();

  const createPost = (title, excerpt, content) => {
    const newPost = {
      title: title,
      excerpt: excerpt,
      content: content,
    };
    axios
      .post("https://bloggies-api.herokuapp.com/api/posts/create", newPost, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        navigate(`/posts/${res.data._id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getPosts = useCallback(async () => {
    const res = await axios.get("https://bloggies-api.herokuapp.com/api/posts");
    setPosts(res.data);
  }, []);

  const getPost = useCallback(async (id) => {
    const res = await axios.get(
      `https://bloggies-api.herokuapp.com/api/posts/${id}`
    );
    setPost(res.data);
    setLikes(res.data.likes);
    if (res.data.likes.includes(localStorage.getItem("id"))) {
      setLiked(true);
    } else {
      setLiked(false);
    }
    console.log(res.data);
  }, []);

  const editPost = async (id, title, excerpt, content) => {
    const post = {
      title: title,
      excerpt: excerpt,
      content: content,
    };
    const res = await axios.put(
      `https://bloggies-api.herokuapp.com/api/posts/${id}/edit`,
      post,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    navigate(`/posts/${id}`);
  };

  const deletePost = async (id) => {
    const res = await axios.delete(
      `https://bloggies-api.herokuapp.com/api/posts/${id}/delete`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    getPosts();
    console.log(res.data);
  };
  const getComments = useCallback(async (id) => {
    const res = await axios.get(
      `https://bloggies-api.herokuapp.com/api/posts/${id}`
    );
    setComments(res.data.comments);
  }, []);
  const createComment = async (comment, id) => {
    const newComment = {
      commentContent: comment,
    };
    try {
      await axios.post(
        `https://bloggies-api.herokuapp.com/api/posts/${id}/comments`,
        newComment,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      getComments(id);
    } catch (error) {
      console.log(error);
    }
  };
  const getLikes = async (id) => {
    const res = await axios.get(
      `https://bloggies-api.herokuapp.com/api/posts/${id}`
    );
    setLikes(res.data.likes);
  };
  const likePost = async (id) => {
    try {
      await axios.put(
        `https://bloggies-api.herokuapp.com/api/posts/${id}/like`,
        { user_id: localStorage.getItem("id") },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      getLikes(id);
    } catch (error) {
      console.log(error);
    }
  };
  const unlikePost = async (id) => {
    try {
      await axios.put(
        `https://bloggies-api.herokuapp.com/api/posts/${id}/unlike`,
        { user_id: localStorage.getItem("id") },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      getLikes(id);
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    getPosts,
    getPost,
    editPost,
    deletePost,
    getComments,
    createPost,
    createComment,
    likePost,
    unlikePost,
    posts,
    likes,
    liked,
    setLiked,
    comments,
    setPost,
    setLikes,
    post,
    error,
    setError,
  };
  return (
    <PostContext.Provider value={value}>{props.children}</PostContext.Provider>
  );
};
