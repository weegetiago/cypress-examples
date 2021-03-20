/// <reference types="cypress" />

import Login from '/cypress-examples/cypress/pages/login/login.js';

const retornoAcessoGmail = '//*[@id="headingText"]/span'
const retornoAcessoGmail2 = '.o6cuMc'

context('Testes de Login', () => {

    beforeEach(() => {
        Login.acessaGmail()
    })

    it('01-Tenta acessar conta do gmail', () => {
        Login.loginSemSenha(login01);
        cy.xpath(retornoAcessoGmail, { timeout: 1000 })
            .should('contain.text', 'Não foi possível fazer o login')
    })

    it('02-Tenta acessar sem informar conta do gmail', () => {
        Login.loginSemSenha(login02);
        cy.get(retornoAcessoGmail2, { timeout: 1000 })
            .should('have.text', 'Digite um e-mail ou número de telefone')
    })

    const login01 = {
        usuario: 'weegetiago@gmail.com',
    }

    const login02 = {
        usuario: ' ',
    }

})    