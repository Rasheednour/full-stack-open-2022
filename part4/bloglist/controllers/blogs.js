const blogsRouter = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const users = await User.find({});
  if (!users) {
    return response.status(404).json({ error: "no users found" });
  }
  const user = users[0];
  const blogObject = request.body;
  blogObject.user = user.id;
  const blog = new Blog(blogObject);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const newBlog = request.body;
  await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  response.status(200).json(newBlog);
});

module.exports = blogsRouter;
