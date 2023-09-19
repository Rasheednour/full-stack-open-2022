import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="Title"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
            placeholder='write the blog title'
            id='title-input'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="Author"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
            placeholder='write the blog author'
            id='author-input'
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="URL"
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
            placeholder='write the blog url'
            id='url-input'
          />
        </div>
        <button type="submit" id='blog-form-button'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
