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

    it('blog post can be removed', function () {
      // Add new blog post to work with.
      cy.addBlog({
        title: 'Blog to be removed',
        author: 'Removed Author',
        url: 'https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-23'
      })

      // Open details and click the remove button.
      cy
        .get('.blog-item')
        .should('contain', 'Blog to be removed Removed Author')
        .contains('show')
        .click()
        .closest('.blog-item')
        .find('.remove-button')
        .click()

      // Finally make sure the blog is not listed anymore.
      cy
        .get('.blog-item')
        .find('.like-count')
        .invoke('text')
        .should('not.eq', 'Blog to be removed')
    })

    it('blog post remove button is visible only to the owner', function () {
      // Add new blog post to work with.
      cy.addBlog({
        title: 'Blog to be removed',
        author: 'Removed Author',
        url: 'https://fullstackopen.com/osa5/end_to_end_testaus#tehtavat-5-17-5-23'
      })

      // Create another user and log in with the credentials.
      const user = {
        name: 'Maija Meikäläinen',
        username: 'maijameikalainen',
        password: 'lahnaonkala'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login({ username: 'maijameikalainen', password: 'lahnaonkala' })
      cy.visit('')

      // Open details and make sure remove button is not visible.
      cy
        .get('.blog-item')
        .contains('Blog to be removed Removed Author')
        .closest('.blog-item')
        .contains('show')
        .click()
        .closest('.blog-item')
        .find('.remove-button')
        .should('not.not.exist')
    })

    it('blogs are ordered by their likes', function () {
      // Add two blog posts to work with.
      cy.addBlog(blogToTest)
      cy.addBlog(anotherBlogToTest)

      // Make sure blogs are initially ordered correctly. This point they are
      // in their creation order because of no likes yet.
      cy.get('.blog-item__title').eq(0).should('contain', blogToTest.title)
      cy.get('.blog-item__title').eq(1).should('contain', anotherBlogToTest.title)

      // Open details and click the like button.
      cy
        .get('.blog-item__title')
        .contains('My second own blog')
        .closest('.blog-item')
        .contains('show')
        .click()
        .closest('.blog-item')
        .find('.like-button')
        .click()
        .closest('.blog-item')
        .find('.like-count')
        .invoke('text')
        .should('eq', '1')

      // Make sure blog items have switched positions because of like.
      cy.get('.blog-item__title').eq(0).should('contain', anotherBlogToTest.title)
      cy.get('.blog-item__title').eq(1).should('contain', blogToTest.title)
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

const anotherBlogToTest = {
  title: 'My second own blog',
  author: 'Matti Meikäläinen',
  likes: 0,
  url: 'https://www.google.com',
  user: {
    name: 'Matti Meikäläinen',
    username: 'mattimeikalainen'
  }
}
