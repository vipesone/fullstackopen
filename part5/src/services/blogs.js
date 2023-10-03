import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const create = async newBlog => {
  const config = {
    headers : { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const update = async (id, newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return response.data
}

export default {
  create,
  getAll,
  setToken,
  update
 }
