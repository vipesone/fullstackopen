import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('initial render does not show full details', () => {
  const { container } = render(<Blog blog={blogToTest} likeBlog={() => null} removeBlog={() => null} isOwner={true} />)

  const element = container.querySelector('.blog-item')
  expect(element).toHaveTextContent(blogToTest.title)
  expect(element).toHaveTextContent(blogToTest.author)

  const togglableContent = container.querySelector('.blog-item__details')
  expect(togglableContent).toHaveStyle('display: none')
})

test('clicking the show button displays details', async () => {
  const { container } = render(<Blog blog={blogToTest} likeBlog={() => null} removeBlog={() => null} isOwner={true} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')

  await user.click(button)

  const togglableContent = container.querySelector('.blog-item__details')
  expect(togglableContent).not.toHaveStyle('display: none')
})

test('clicking the like button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blogToTest} likeBlog={mockHandler} removeBlog={() => null} isOwner={true} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')

  // Click like button twice.
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
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
