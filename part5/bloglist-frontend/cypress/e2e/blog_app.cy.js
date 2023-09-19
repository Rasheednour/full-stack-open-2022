describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.create_user({ name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Error: invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('some blog title')
      cy.get('#author-input').type('some blog author')
      cy.get('#url-input').type('someblog.com')
      cy.get('#blog-form-button').click()
      cy.contains('a new blog some blog title by some blog author added')
    })
    describe('And some blogs exist', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title-input').type('some blog title')
        cy.get('#author-input').type('some blog author')
        cy.get('#url-input').type('someblog.com')
        cy.get('#blog-form-button').click()
      })
      it('Users can like a blog', function () {
        cy.get('#view-button').click()
        cy.contains('some blog title some blog author')
          .get('#like-button').click()
        cy.contains('some blog title some blog author').parent().find('.likes')
          .should('contain', 'likes 1')
      })
      it('Users can delete a blog', function () {
        cy.get('#view-button').click()
        cy.contains('some blog title some blog author')
          .get('#remove-button').click()
        cy.contains('some blog title some blog author').should('not.exist')
      })
      it('Users cannot see the delete button of a blog they havent created', function () {
        cy.logout()
        cy.create_user({ name: 'John Doe', username: 'jdoe', password: 'johnspassword' })
        cy.login({ username: 'jdoe', password: 'johnspassword' })
        cy.get('#view-button').click()
        cy.contains('some blog title some blog author').parent().get('#remove-button').should('not.exist')
        cy.logout()
      })
      it('Blogs are ordered according to likes, as the blog with most likes show on top', function () {

        cy.contains('new blog').click()
        cy.get('#title-input').type('another blog')
        cy.get('#author-input').type('another author')
        cy.get('#url-input').type('anothertblog.com')
        cy.get('#blog-form-button').click().wait(500)

        cy.contains('another blog another author').parent()
          .contains('view').click().wait(500)

        cy.contains('another blog another author').parent()
          .contains('like').click().wait(500).click().wait(500)

        cy.visit('')

        cy.get('.blog').eq(0).should('contain', 'another blog another author')
        cy.get('.blog').eq(1).should('contain', 'some blog title some blog author')
      })
    })
  })
})