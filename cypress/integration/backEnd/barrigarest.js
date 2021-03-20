/// <reference types="cypress" />

describe('Testes de API', () => {

    let token

    before(() => {
        cy.getToken(login)
            .then(resToken => {
                token = resToken
            })
    })

    it('C01 Reset de contas', () => {
        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: { Authorization: `JWT ${token}` },
        })
    })

    it('C02 Cadastra uma conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'WEEGE',
            }
        }).then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome')
        })
    })

})


const login = {
    user: 'tw@tw',
    pass: 'tw'
}
