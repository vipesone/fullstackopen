import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog addition form passes correct information to its handler', async () => {
  const user = userEvent.setup()
  const addBlog = jest.fn()

  const { container } = render(<BlogForm addBlog={addBlog} />)

  const titleInput = container.querySelector('#blog-title')
  const authorInput = container.querySelector('#blog-author')
  const urlInput = container.querySelector('#blog-url')
  const submitButton = container.querySelector('button[type=submit]')

  await user.type(titleInput, blogToTest.title)
  await user.type(authorInput, blogToTest.author)
  await user.type(urlInput, blogToTest.url)
  await user.click(submitButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe(blogToTest.title)
  expect(addBlog.mock.calls[0][0].author).toBe(blogToTest.author)
  expect(addBlog.mock.calls[0][0].url).toBe(blogToTest.url)
})

const blogToTest = {
  title: 'My very own blog',
  author: 'Matti Meikäläinen',
  likes: 0,
  url: 'https://www.google.com',
  user: {
    name: 'Matti Meikäläinen',
    username: 'mattimeikalainen'
  }
}
