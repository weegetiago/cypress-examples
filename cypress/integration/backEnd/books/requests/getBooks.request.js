/// <reference types="cypress" />

function allBooks() {
    return cy.request({
        method: 'GET',
        url: 'Books',
        failOnStatusCode: false,
    })
}

export { allBooks };