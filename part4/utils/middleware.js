const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'UserRequiredMissing') {
    return response.status(400).send({ error: 'username or password missing' })
  } else if (error.name === 'UserInvalidPassword') {
    return response.status(400).send({ error: 'invalid password, password should be at least 3 characters long' })
  }

  next(error)
}

module.exports = {
  errorHandler
}
