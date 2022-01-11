import { useState, useContext } from "react";
import { PostContext } from "../../context/postContext";

import { useParams } from "react-router";
const NewComment = () => {
  const { postId } = useParams();
  const [input, setInput] = useState("");
  const { createComment } = useContext(PostContext);
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createComment(input, postId);
    setInput("");
  };

  return (
    <form className="container max-w-lg" onSubmit={handleSubmit}>
      <textarea
        className="w-full h-full  text-sm border border-solid border-neutral-200 p-5 outline-none"
        placeholder="Add a public comment..."
        value={input}
        onChange={handleInput}
      ></textarea>
      <div className="text-sm flex items-center justify-end gap-4">
        <button type="button" onClick={() => setInput("")}>
          {" "}
          Cancel{" "}
        </button>
        <button type="submit" className=" btn btn-green">
          Comment
        </button>
      </div>
    </form>
  );
};

export default NewComment;
