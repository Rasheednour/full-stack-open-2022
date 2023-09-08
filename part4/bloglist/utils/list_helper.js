const _ = require('lodash')

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

const mostBlogs = (blogs) => {
    if(!blogs) {
        return {}
    } else {
        const counts = _.countBy(blogs, 'author');
        const topAuthor = _.maxBy(Object.keys(counts), (author) => counts[author])
        const blogCount = counts[topAuthor]
        return {author: topAuthor, blogs: blogCount}
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
