import { useEffect, useContext } from "react";
import { PostContext } from "../context/postContext";
const Modal = ({ setModalHidden, modalHidden, title, postId }) => {
  const { deletePost } = useContext(PostContext);
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full flex flex-col justify-center items-center bg-black/[0.4] z-10">
      <div className="relative mb-40 container max-w-2xl flex flex-col gap-4 items-center bg-white shadow-2xl rounded-lg p-12">
        <p className="text-sm sm:text-xl">
          Are you sure you want to delete this post?
        </p>
        <p className="font-bold truncate w-3/4 text-center">{title} </p>
        <div className="flex gap-5">
          <button
            className="btn btn-green"
            onClick={() => setModalHidden(!modalHidden)}
          >
            Cancel
          </button>
          <button
            className="btn bg-red-500 text-white font-bold"
            onClick={() => {
              deletePost(postId);
              setModalHidden(!modalHidden);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
