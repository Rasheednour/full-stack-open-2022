const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("correct number of blogs is returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;
  for (const blog of blogs) {
    expect(blog.id).toBeDefined();
  }
});

test("Making a POST request creates a new blog post", async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const urls = response.body.map((blog) => blog.url);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(urls).toContain(
    "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});
