import PostList from "../Components/posts/postList";
import { useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import lottie from "lottie-web";
import bloggingAnmination from "../assets/images/homeAnimation.json";
import { AuthContext } from "../context/authContext";
const Home = () => {
  const container = useRef(null);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: bloggingAnmination,
    });
  }, []);
  console.log(currentUser);
  return (
    <>
      <section className="flex items-center justify-center bg-rose-300 ">
        <div className="container flex  w-screen flex-col-reverse md:flex-row items-center gap-3  mt-8 lg:mt-12 md:ml-12 lg:ml-14 ">
          <div className="flex flex-1  flex-col items-center md:items-start ">
            <h2 className="text-white font-bold text-3xl md:text-4xl lg:text-5xl text-center md:text-left mb-6 font-Courgette">
              Create blogs about anything!
            </h2>
            <p className=" text-white  font-semibold text-xl text-center  lg:text-left mb-6 ">
              Bloggies is a place to share whatever comes to mind whether it's
              for educational purposes or just a simple story, it's all accepted
              here at Bloggies!
            </p>
            <div className="flex justify-center flex-wrap gap-6 mb-5">
              {currentUser ? (
                <Link to="/create">
                  <button type="button" className="btn btn-green ">
                    Get Started
                  </button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <button type="button" className="btn btn-green ">
                      Register
                    </button>
                  </Link>
                  <Link to="/login">
                    <button type="button" className="btn btn-green ">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div
            className=" w-5/6 h-5/6 flex justify-center flex-1 mb-10 sm:w-3/4 sm:h-3/4 md:w-full md:h-full md:mb-16 lg:mb-0 "
            ref={container}
          ></div>
        </div>
      </section>
      <PostList />
    </>
  );
};

export default Home;
