/// <reference types="cypress" />

const usuario = '#identifierId';
const proximoButton = '#identifierNext';

class Login {

    acessaGmail(){
        cy.visit('https://accounts.google.com/ServiceLogin?hl=pt-BR&passive=true&continue=https://www.google.com.br/&ec=GAZAmgQ','{enter}')
    }

    loginSemSenha(params) {
        cy.get(usuario, {timeout: 10000}).type(params.usuario)
        cy.get(proximoButton).click()
    }
}

export default new Login();