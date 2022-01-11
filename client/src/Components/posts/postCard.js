import testImg from "../../assets/images/blogging.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import Modal from "../modal";
const PostCard = ({ title, excerpt, author, id }) => {
  let navigate = useNavigate();
  const [hidden, setHidden] = useState(true);
  const [modalHidden, setModalHidden] = useState(true);
  const handleHidden = () => {
    setHidden(!hidden);
  };
  const handleModalHidden = () => {
    setModalHidden(!modalHidden);
    setHidden(!hidden);
  };

  return (
    <>
      {modalHidden ? null : (
        <Modal
          setModalHidden={setModalHidden}
          modalHidden={modalHidden}
          title={title}
          postId={id}
        />
      )}
      <div className=" relative flex flex-col items-center md:flex-row md:items-start rounded-lg shadow-xl mt-4 w-100 mx-2 sm:mb-5 sm:mx-6">
        {author === localStorage.getItem("user") ? (
          <>
            <HiDotsHorizontal
              className="absolute top-8 right-6 md:top-4 cursor-pointer"
              onClick={handleHidden}
            />
            <div
              className={
                hidden
                  ? "hidden"
                  : "absolute right-7 top-12 p-2 md:top-7 bg-white border border-neutral-300 border-solid rounded-lg shadow-lg"
              }
            >
              <ul>
                <li
                  className="hover:font-medium cursor-pointer"
                  onClick={handleModalHidden}
                >
                  Delete Post
                </li>
                <Link to={`/posts/${id}/edit`} className="hover:font-medium">
                  <li>Edit Post</li>
                </Link>
              </ul>
            </div>
          </>
        ) : null}

        <div
          className="h-64 w-auto cursor-pointer"
          onClick={() => navigate(`/posts/${id}`)}
        >
          <img
            src={testImg}
            className="inset-0 h-full object-cover object-center "
            alt="test"
          />
        </div>

        <div
          className="w-full h-40 md:h-64 py-4 px-6 text-gray-800 flex flex-col justify-between cursor-pointer"
          onClick={() => navigate(`/posts/${id}`)}
        >
          <h3 className="font-semibold text-lg leading-tight line-clamp-1 ">
            {title}
          </h3>

          <div className=" line-clamp-2 text-sm ">{excerpt}</div>

          <p className="text-sm text-gray-700 tracking-wide font-semibold ">
            By {author}
          </p>
        </div>
      </div>
    </>
  );
};

export default PostCard;
