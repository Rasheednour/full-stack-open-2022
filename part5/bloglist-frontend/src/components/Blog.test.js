import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  id: 1,
  author: 'Arbitrary Author',
  title: 'Some Blog',
  url: 'someblog.com',
  likes: 4,
  user: {
    name: 'Some User',
    username: 'someusername',
    id: 1234,
  },
}

let container
const mockHandler = jest.fn()
beforeEach(() => {
  const component  = render(<Blog blog={blog} updateBlog={mockHandler}/>)
  container = component.container
})

test('blog component renders the blog title and author but not the URL or likes', () => {

  const div1 = container.querySelector('.blog-title-author')
  const div2 = container.querySelector('.blog-info')
  expect(div1).toHaveTextContent(blog.title, blog.author)
  expect(div2).not.toBeInTheDocument()
})

test('blog url and number of likes show when the user clicks on the show button', async () => {
  const user = userEvent.setup()
  let button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.blog-info')
  expect(div).toBeInTheDocument()
  button = screen.getByText('hide')
  await user.click(button)
  expect(div).not.toBeInTheDocument()
})

test('the event ', async () => {
  const user = userEvent.setup()
  let button = screen.getByText('view')
  await user.click(button)
  const div = container.querySelector('.blog-info')
  expect(div).toBeInTheDocument()
  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})