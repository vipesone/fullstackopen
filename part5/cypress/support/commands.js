Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('blogUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url, likes = 0 }) => {
  console.log(localStorage)
  const blogUser = JSON.parse(localStorage.getItem('blogUser'))
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url, likes },
    headers: {
      'Authorization': `Bearer ${blogUser.token}`
    }
  })
  cy.visit('')
})
