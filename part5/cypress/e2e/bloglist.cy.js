describe('Bloglist ', function() {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Meikäläinen',
      username: 'mattimeikalainen',
      password: 'haukionkala'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mattimeikalainen')
      cy.get('#password').type('haukionkala')
      cy.get('#login-button').click()

      cy.contains('Matti Meikäläinen is logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('mattimeikalainen')
      cy.get('#password').type('haukionlintu')
      cy.get('#login-button').click()

      cy.should('not.contain', 'Matti Meikäläinen is logged in')
    })
  })

  describe('After login', function () {
    beforeEach(function () {
      cy.login({ username: 'mattimeikalainen', password: 'haukionkala' })
    })

    it('a new blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#blog-title').type(blogToTest.title)
      cy.get('#blog-author').type(blogToTest.author)
      cy.get('#blog-url').type(blogToTest.url)

      cy.get('#blog-submit').click()

      cy.get('.blog-item').should('contain', `${blogToTest.title}`)
    })

    it('blog post can be liked', function () {
      // Add new blog post to work with.
      cy.addBlog({
        title: 'Blog to be liked',
        author: 'Liked Author',
        url: 'https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-23'
      })

      // Open details and click the like button.
      cy
        .get('.blog-item')
        .should('contain', 'Blog to be liked Liked Author')
        .contains('show')
        .click()
        .closest('.blog-item')
        .find('.like-button')
        .click()

      // Finally check if the like count has been updated.
      cy
        .get('.blog-item')
        .find('.like-count')
        .invoke('text')
        .should('eq', '1')
    })
  })
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
