import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const register = (email, password, username) => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };

    axios
      .post("https://bloggies-api.herokuapp.com/api/users/register", newUser)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.id);
        setCurrentUser(res.data.username);
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.status);
      });
  };
  const login = (username, password) => {
    const user = {
      username: username,
      password: password,
    };

    axios
      .post("https://bloggies-api.herokuapp.com/api/users/login", user)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.username);
        localStorage.setItem("id", res.data.id);
        setCurrentUser(res.data.username);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    window.location.reload();
  };

  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"));
    setLoading(false);
  }, [currentUser]);

  const value = {
    currentUser,
    register,
    login,
    logout,
    error,
    setError,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
