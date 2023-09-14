const blogsRouter = require("express").Router();
const { response } = require("../app");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blogObject = request.body;
  blogObject.user = user.id;
  const blog = new Blog(blogObject);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "missing token" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const userId = decodedToken.id;
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }
  if (blogToDelete.user.toString() !== userId.toString()) {
    return response.status(401).json({ error: "invalid user" });
  }
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = request.body;
  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  response.status(200).json(newBlog);
});

module.exports = blogsRouter;
