/// <reference types="cypress"/>

describe('Buscar dispositivo', () => {

    it('Buscar objeto específico', () =>{

        const id_device = "7"

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${id_device}`,
            failOnStatusCode: false
        }).as('GetDeviceResult')

        // validações
        cy.get('@GetDeviceResult')
            .then((response) =>{
                expect(response.status).equal(200)
                expect(response.body).not.empty

                expect(response.body.id).equal(id_device)
                expect(response.body.id).not.empty

                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body.name).not.empty

                expect(response.body.data['CPU model']).not.empty
                expect(response.body.data['CPU model']).equal('Intel Core i9')

                expect(response.body.data['Hard disk size']).not.empty
                expect(response.body.data['Hard disk size']).equal('1 TB')

                expect(response.body.data.price).not.string
                expect(response.body.data.price).equal(1849.99)

                expect(response.body.data.year).not.string
                expect(response.body.data.year).equal(2019)

        })

    }) 


    it('Buscar objeto inexistente', () =>{

        const id_device_inexistente = "teste"

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${id_device_inexistente}`,
            failOnStatusCode: false
        }).as('GetDeviceResult')

        // validações
        cy.get('@GetDeviceResult')
            .then((response) =>{
                expect(response.status).equal(404)
                expect(response.body.error).equal(`Oject with id=${id_device_inexistente} was not found.`)

        })

    })


    it('Buscar objeto com url incorreta', () =>{

        const id_device = "7"

        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/object/${id_device}`,
            failOnStatusCode: false
        }).as('GetDeviceResult')

        // validações
        cy.get('@GetDeviceResult')
            .then((response) =>{
                expect(response.status).equal(404)

        })

    }) 
})