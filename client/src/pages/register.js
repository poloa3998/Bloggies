import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/authContext";
import lottie from "lottie-web";
import registerAnimation from "../assets/images/registerAnimation.json";
import { Link } from "react-router-dom";
const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const handleSearch = (e) => {
    const value = e.target.value;
    setInput({
      ...input,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(input.email, input.password, input.username);

    setInput({
      username: "",
      email: "",
      password: "",
    });
  };
  const container = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      animationData: registerAnimation,
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
            Start Blogging!
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
            type="text"
            className=" text-center w-52 sm:w-72 h-10 border-solid border  border-black rounded-lg"
            name="email"
            value={input.email}
            placeholder="Email"
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
            Register
          </button>
          <p className="font-Courgette">
            Already have an account?
            <Link
              to="/login"
              className="font-Courgette text-rose-400 font-bold pl-1"
            >
              Login
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

export default Register;
