import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({
        text: `Error: ${exception.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const createBlog = async (event) => {
    blogFormRef.current.toggleVisibility();
    event.preventDefault();
    try {
      const blog = await blogService.create(newBlog);
      setNewBlog({ title: "", author: "", url: "" });
      setBlogs(blogs.concat(blog));
      setMessage({
        text: `a new blog ${blog.title} by ${blog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage({
        text: `Error: ${exception.response.data.error}`,
        type: "error",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <Notification message={message} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
              newBlog={newBlog}
              setNewBlog={setNewBlog}
            />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
