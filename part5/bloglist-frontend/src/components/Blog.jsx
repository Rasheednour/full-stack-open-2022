import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [isHidden, setIsHidden] = useState(true)

  const toggleDisplay = () => {
    setIsHidden(!isHidden)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const updateLikes = () => {
    const updatedBlog = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(blog.id, updatedBlog, blog.user)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }
  return (
    <div style={blogStyle}>
      <span className='blog-title-author'>
        {blog.title} {blog.author}
      </span>
      <button onClick={toggleDisplay}>{isHidden ? 'view' : 'hide'}</button>
      {!isHidden && (
        <div className='blog-info'>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog
