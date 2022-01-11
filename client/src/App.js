import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Nav from "./Components/nav";
import Login from "./pages/login";
import Register from "./pages/register";
import Post from "./pages/Post";
import Dashboard from "./pages/dashboard";
import CreatePost from "./pages/createPost";
import { AuthProvider } from "./context/authContext";
import { PostProvider } from "./context/postContext";
import EditPost from "./pages/editPost";
function App() {
  const NavBarActive = () => {
    const location = useLocation();
    return location.pathname === "/register" ||
      location.pathname === "/login" ? null : (
      <Nav />
    );
  };
  return (
    <HashRouter basename="/">
      <AuthProvider>
        <PostProvider>
          <NavBarActive />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/posts/:postId/edit" element={<EditPost />} />
            <Route path="/posts/:postId" element={<Post />} />
          </Routes>
        </PostProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
