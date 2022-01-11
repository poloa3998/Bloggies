import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
const Nav = () => {
  const [isHidden, setHidden] = useState(true);
  const { currentUser, logout } = useContext(AuthContext);
  const handleHidden = () => {
    setHidden(!isHidden);
  };

  return (
    <nav className=" mb-5">
      <ul className="flex items-center justify-between h-12  font-bold  px-12 md:px-16 lg:px-24 pt-5">
        <div className="flex">
          <Link to="/">
            <li className="font-Courgette text-3xl text-rose-400"> Bloggies</li>
          </Link>
        </div>
        <div className="hidden md:flex gap-8">
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <li className="btn btn-green">Dashboard</li>
              </Link>
              <Link to="/create">
                <li className="btn btn-green">Create Post</li>
              </Link>

              <li className="btn btn-green" onClick={() => logout()}>
                Sign Out
              </li>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="btn btn-green">Login</li>
              </Link>
              <Link to="/register">
                <li className="btn btn-green">Register</li>
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button className=" mobile-menu-button" onClick={handleHidden}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </ul>
      {/* Mobile Menu*/}
      <div
        className={
          isHidden
            ? "hidden"
            : "md:hidden w-screen bg-white h-52 absolute top-16 right-0 left-0 bottom-0 flex justify-center  transition-all text-rose-300 font-bold z-10"
        }
      >
        <ul>
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <li className="pb-4" onClick={handleHidden}>
                  Dashboard
                </li>
              </Link>
              <Link to="/create">
                <li className="pb-4" onClick={handleHidden}>
                  Create Post
                </li>
              </Link>

              <li
                className=""
                onClick={() => {
                  handleHidden();
                  logout();
                }}
              >
                Sign Out
              </li>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="pb-2">Login</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
