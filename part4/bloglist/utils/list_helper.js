const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  let favorite;

  blogs.forEach((blog) => {
    if (!favorite) {
      favorite = { title: blog.title, author: blog.author, likes: blog.likes };
    } else if (blog.likes > favorite.likes) {
      favorite = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });

  return favorite || {};
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
