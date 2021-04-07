/// <reference types="cypress" />

const entrarButton = '.ecs_hl_fx > .ecs_hl_ab';
const confirmarButton = '//*[@data-gtm-name="confirmar"]';
const consultaCpfButton = '//*[@data-gtm-name="consultar-cpf"]';
const cpfInput = '#cpf';

class ConsultaCpf {

    acessaUrl() {
        cy.visit('https://serasaconsumidor.com.br/')
    }

    consultaCpf(params) {
        cy.xpath(consultaCpfButton, { timeout: 50000 })
            .scrollIntoView({ duration: 1000 })
        cy.get(entrarButton, { timeout: 50000 }).click({ force: true })
        if (params.cpf) {
            cy.get(cpfInput, { timeout: 50000 }).type(params.cpf)
        }
        cy.xpath(confirmarButton).click()
    }
}

export default new ConsultaCpf();