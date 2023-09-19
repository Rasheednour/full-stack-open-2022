import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    id: 1,
    author: 'Arbitrary Author',
    title: 'Some Blog',
    url: 'someblog.com',
    likes: 4,
    user: {
      name: 'Some User',
      username: 'someusername',
      id: 1234
    }
  }

  const { container } = render(<Blog blog={blog} />)
  const div1 = container.querySelector('.blog-title-author')
  const div2 = container.querySelector('.blog-info')
  expect(div1).toHaveTextContent(blog.title, blog.author)
  expect(div2).not.toBeInTheDocument()
})