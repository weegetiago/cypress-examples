/// <reference types="cypress" />

import ConsultaCpf from '/cypress-examples/cypress/pages/cpf/cpf.js';

const formCriarConta = '#sign_up_form';
const formCpfInput = '//*[@data-gtm-type="form"]';

context('Reliza consultas sobre o CPF', () => {

    beforeEach(() => {
        ConsultaCpf.acessaUrl()
    })

    after(() => {
        cy.end()
    })

    it('C01 - Consulta CPF válido.', () => {
        ConsultaCpf.consultaCpf(cpf01)
        cy.get(formCriarConta, { timeout: 50000 })
            .should('contain.text', 'CPF')
            .should('contain.text', 'Nome Completo')
            .should('contain.text', 'E-mail')
            .should('contain.text', 'Senha')
            .should('contain.text', 'Data de Nascimento')
    })

    it('C02 - Consulta CPF invalido.', () => {
        ConsultaCpf.consultaCpf(cpf02)
        cy.xpath(formCpfInput, { timeout: 50000 })
            .should('contain.text', 'Você precisa informar um CPF válido')
    })

    it('C03 - Consulta sem informar nada no campo CPF.', () => {
        ConsultaCpf.consultaCpf(cpf03)
        cy.xpath(formCpfInput, { timeout: 50000 })
            .should('contain.text', 'Por favor preencha seu CPF')
    })

    const cpf01 = {
        cpf: '80489042090',
    }

    const cpf02 = {
        cpf: '99999999999',
    }

    const cpf03 = {

    }

})