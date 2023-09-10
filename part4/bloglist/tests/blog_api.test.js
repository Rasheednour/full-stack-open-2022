const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("when therre is initially some blogs saved", () => {
  test("correct number of blogs is returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("the unique identifier property of blog posts is named id", async () => {
    const response = await api.get("/api/blogs");
    const blogs = response.body;
    for (const blog of blogs) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe("addition of a new blog", () => {
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

    const blogs = await helper.blogsInDb();

    const urls = blogs.map((blog) => blog.url);

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(urls).toContain(
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
    );
  });

  test("the likes property defaults to 0 if missing from the POST request", async () => {
    const newBlog = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    const createdBlog = blogs[blogs.length - 1];
    expect(createdBlog.likes).toBe(0);
  });

  test("the beckend responds with 400 status code if the title and url properties of a new blog are missing", async () => {
    const noTitle = {
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 5,
    };

    const noUrl = {
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 5,
    };

    await api.post("/api/blogs").send(noTitle).expect(400);

    await api.post("/api/blogs").send(noUrl).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
