// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('getToken', (login) => {
    cy.request({
        method: 'POST',
        url: '/signin',
        body: {
            email: login.user,
            redirecionamento: false,
            senha: login.pass
        }
    })
        .its('body.token').should('not.be.empty')
        .then(token => {
            return token
        })
})

Cypress.Commands.add('buscaContaPorNome', name => {
    //TODO AJUSTAR
    cy.getToken('tw@tw', 'tw').then(token => { //passar login por ()
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: name
            }
        }).then(res => {
            return res.body[0].id
        })
    })
})

//TODO Caso queria usar como comands
/* Cypress.Commands.add('reset', () => {
    cy.getToken(login).then(token => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization: `JWT ${token}` },
        })
    })
}) */
