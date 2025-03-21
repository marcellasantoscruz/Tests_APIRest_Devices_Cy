/// <reference types="cypress"/>

describe('Deletando um dispositivo', () => {

        it('Deletando um dispositivo com sucesso', () => {

            const body = {
                "name": "Windows 10",
                "data": {
                   "year": 2010,
                   "price": 999.99,
                   "CPU model": "Intel Core i5",
                   "Hard disk size": "1 TB"
                }}

            cy.request({
                method: 'POST',
                url: 'https://api.restful-api.dev/objects',
                failOnStateCode: false,
                body: body 
            }).as('postDeviceResult')

            //validações
            cy.get('@postDeviceResult')
                .then((response_post) => {
                    console.log(expect(response_post.status).equal(200))

                    cy.request({
                        method: 'DELETE', 
                        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                        failOnStateCode: false
                     }).as('deleteDeviceResult')
         
                     //validações
                     cy.get('@deleteDeviceResult')
                         .then((response_del) =>{
                             expect(response_del.status).equal(200)
                             expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
                         })
                })


            
        }) 


        it('Deletando um dispositivo inexistente', () => {

            const id_inexistente = 'teste'

            cy.request({
                method: 'DELETE', 
                url: `https://api.restful-api.dev/objects/${id_inexistente}`,
                failOnStatusCode: false
            }).as('deleteDeviceResult')
         
             //validações
                cy.get('@deleteDeviceResult')
                         .then((response_del) =>{
                             expect(response_del.status).equal(404)
                             expect(response_del.body.error).equal(`Object with id = ${id_inexistente} doesn't exist.`)
                         })
         })

         
        it('Deletando um dispositivo com a url incorreta', () => {

            const body = {
                "name": "Windows 10",
                "data": {
                   "year": 2010,
                   "price": 999.99,
                   "CPU model": "Intel Core i5",
                   "Hard disk size": "1 TB"
                }}

            cy.request({
                method: 'POST',
                url: 'https://api.restful-api.dev/objects',
                failOnStatusCode: false,
                body: body 
            }).as('postDeviceResult')

            //validações
            cy.get('@postDeviceResult')
                .then((response_post) => {
                    console.log(expect(response_post.status).equal(200))

                    cy.request({
                        method: 'DELETE', 
                        url: `https://api.restful-api.dev/object/${response_post.body.id}`,
                        failOnStatusCode: false
                     }).as('deleteDeviceResult')
         
                     //validações
                     cy.get('@deleteDeviceResult')
                         .then((response_del) =>{
                             expect(response_del.status).equal(404)
                         })
                })


            
        }) 


}) 


