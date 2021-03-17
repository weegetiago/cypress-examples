/// <reference types="cypress" />

import Maps from '/cypress-examples/cypress/pages/maps/maps.js';

context('Testes de Login', () => {

    beforeEach(() => {
        Maps.acessaGoogleMaps()
    })

    it('01-Tenta acessar conta do gmail', () => {
        Maps.realizacolsultaDeRota(params01)
    })

    const params01 = {
        cidade1: 'Timbó SC',
        cidade2: 'Caxias do Sul RS',
    }

})   