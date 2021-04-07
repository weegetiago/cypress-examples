/// <reference types="cypress" />

//Front: https://barrigareact.wcaquino.me
//API: https://barrigarest.wcaquino.me

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
            url: '/reset',
            headers: { Authorization: `JWT ${token}` },
        })
    })

    it('C02 Cadastra uma conta', () => {
        cy.request({
            method: 'POST',
            url: '/contas',
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

    it('C03 Update de uma conta', () => {
        cy.request({
            method: 'GET',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(resposta => {
            cy.request({
                method: 'PUT',
                url: `/contas/${resposta.body[0].id}`,
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'WEEGE - C03 Update de uma conta',
                }
            }).then(res => {
                expect(res.status).to.be.equal(200)
            })
        })

    })

    it('C04 Cria transação em uma conta', () => {
        cy.buscaContaPorNome('Conta para movimentacoes').then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({ days: 1 }).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('status').should('exist')
    })

    it('C05 Verifica saldo conta', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}` }
        }).then(r => {
            let saldoContaX = null
            r.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoContaX = c.saldo
            })
            expect(saldoContaX).to.be.equal('534.00')
        })
    })

    it('C06 Delete transação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}` },
            qs: { descricao: 'Movimentacao para exclusao' }
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `JWT ${token}`},
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 204)
    })

})

const login = {
    user: 'tw@tw',
    pass: 'tw'
}
