describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
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
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
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
    })
  })

})