/// <reference types="cypress" />

const consultaInput = '#searchboxinput';
const cidade1Input = '#sbse0 > .sbqs_c > .suggest > .suggest-text-layout > .suggest-left-cell';

class Maps {

    acessaGoogleMaps(){
        cy.visit('https://www.google.com/maps/@-26.894518,-49.0716105,15z?hl=pt-br','{enter}')
    }

    realizacolsultaDeRota(params) {
        cy.get(consultaInput, {timeout: 10000}).type(params.cidade1)
        //cy.get(proximoButton).click()
        cy.get(cidade1Input, {timeout: 10000}).click()
    }
}

export default new Maps();