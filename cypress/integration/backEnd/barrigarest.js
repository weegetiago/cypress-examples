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
        })
            .then(resposta => {
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

    Cypress.Commands.add('buscaContaPorNome', name => {
        cy.getToken('tw@tw', 'tw').then(token => { //login?
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

    it.only('C04 Cria uma transação', () => {
        cy.buscaContaPorNome('Conta para movimentacoes',)
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: "24/03/2021",
                        data_transacao: "24/03/2021",
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                })
            })
    })

})


const login = {
    user: 'tw@tw',
    pass: 'tw'
}
