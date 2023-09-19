import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('the form calls the event handler it received witht he right details when a new blog is created ', async () => {
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog}/>)
  const titleInput = screen.getByPlaceholderText('write the blog title')
  const authorInput = screen.getByPlaceholderText('write the blog author')
  const urlInput = screen.getByPlaceholderText('write the blog url')
  const sendButton = screen.getByText('create')
  await userEvent.type(titleInput, 'some title')
  await userEvent.type(authorInput, 'some author')
  await userEvent.type(urlInput, 'some url')
  await userEvent.click(sendButton)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('some title')
  expect(createBlog.mock.calls[0][0].author).toBe('some author')
  expect(createBlog.mock.calls[0][0].url).toBe('some url')
})