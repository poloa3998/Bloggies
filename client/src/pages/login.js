import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import lottie from "lottie-web";
import loginAnimation from "../assets/images/loginAnimation3.json";
import { Link } from "react-router-dom";
const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const { login } = useContext(AuthContext);
  const handleSearch = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(input.username, input.password);
    setInput({
      username: "",
      password: "",
    });
  };
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: loginAnimation,
    });
  }, []);
  return (
    <section className=" flex items-center min-h-screen bg-waveMobile  xs:bg-wave sm:bg-waveSm md:bg-waveMd lg:bg-wave bg-cover bg-no-repeat">
      <div className="flex  justify-center sm:justify-end md:pb-20 ">
        <form
          className=" w-screen flex pb-40 md:w-1/2 flex-col justify-center items-center gap-6 md:pb-40 lg:pr-28 "
          onSubmit={handleSubmit}
        >
          <h1 className="font-Courgette text-4xl sm:text-5xl text-rose-400">
            Welcome Back!
          </h1>
          <input
            type="text"
            className=" text-center w-52 sm:w-72 h-10 border-solid border  border-black rounded-lg"
            name="username"
            value={input.username}
            placeholder="Username"
            onChange={handleSearch}
          />
          <input
            type="password"
            className="text-center w-52 sm:w-72 h-10 border-solid border border-black rounded-lg"
            name="password"
            value={input.password}
            placeholder="Password"
            onChange={handleSearch}
          />
          <button type="submit" className="btn btn-green w-36 text-xl">
            Login
          </button>
          <p className="font-Courgette">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-Courgette text-rose-400 font-bold"
            >
              Join free
            </Link>
          </p>
        </form>

        <div
          className=" hidden md:flex flex-1 pb-44  lg:mr-44 "
          ref={container}
        ></div>
      </div>
    </section>
  );
};

export default Login;
