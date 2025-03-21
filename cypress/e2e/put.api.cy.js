/// <reference types="cypress"/>

describe('Alterando um dispositivo', () =>{
        

        it('Alterando um dispositivo com sucesso', () =>{

            const body_post = {
                "name": "Windows Server 2022",
                "data": {
                   "year": 2022,
                   "price": 595.99,
                   "CPU model": "Intel Core i7",
                   "Hard disk size": "2 TB",
                }
             }

             const body_put = {
                "name": "Windows Server 2024",
                "data": {
                   "year": 2024,
                   "price": 965.99,
                   "CPU model": "Intel Core i8",
                   "Hard disk size": "5 TB",
                }
             }

             const dataAtual = new Date().toISOString().slice(0, 10)


            cy.request({
                method: 'POST',
                url: 'https://api.restful-api.dev/objects',
                failOnStateCode: false,
                body: body_post 
            }).as('postDeviceResult')

            //validações
            cy.get('@postDeviceResult')
                .then((response_post) =>{
                    console.log(response_post.body)
                    expect(response_post.body).not.empty
                    expect(response_post.status).equal(200)
                    expect(response_post.body.id).not.empty

                    

                    cy.request({
                        method: 'PUT',
                        url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                        failOnStateCode: false,
                        body: body_put
                    }).as('putDeviceResult')

                    //validações
                    cy.get('@putDeviceResult')
                        .then((response_put) => {
                            console.log(response_put.body)
                            expect(response_put.body).not.empty
                            expect(response_put.status).equal(200)
                            expect(response_put.body.id).not.empty

                            expect(response_put.body.name).not.empty
                            expect(response_put.body.name).equal("Windows Server 2024")

                            expect(response_put.body.updatedAt).not.empty
                            expect(response_put.body.updatedAt.slice(0, 10)).equal(dataAtual)

                            expect(response_put.body.data['CPU model']).not.empty
                            expect(response_put.body.data['CPU model']).equal('Intel Core i8')

                            expect(response_put.body.data['Hard disk size']).not.empty
                            expect(response_put.body.data['Hard disk size']).equal('5 TB')

                            expect(response_put.body.data.price).not.string
                            expect(response_put.body.data.price).equal(965.99)

                            expect(response_put.body.data.year).not.string
                            expect(response_put.body.data.year).equal(2024)
                        })

            })
        }) 


        it('Alterando um dispositivo inexistente', () =>{

             const body_put = {
                "name": "Windows Server 2024",
                "data": {
                   "year": 2024,
                   "price": 965.99,
                   "CPU model": "Intel Core i8",
                   "Hard disk size": "5 TB",
                }
             }

             const id_inexistente = 'teste'

             cy.request({
                     method: 'PUT',
                    url: `https://api.restful-api.dev/objects/${id_inexistente}`,
                    failOnStatusCode: false,
                    body: body_put
                    }).as('putDeviceResult')

                    //validações
                    cy.get('@putDeviceResult')
                        .then((response_put) => {
                            expect(response_put.status).equal(404)
                            expect(response_put.body.error).equal(`The Object with id = ${id_inexistente} doesn't exist. Please provide an object id which exists or generate a new Object using POST request and capture the id of it to use it as part of PUT request after that.`)
                        })

        }) 


        it('Alterando um dispositivo sem body', () =>{

                const body_put = {
                   "name": "Windows Server 2024",
                   "data": {
                      "year": 2024,
                      "price": 965.99,
                      "CPU model": "Intel Core i8",
                      "Hard disk size": "5 TB",
                   }
                }

                const body_post = {
                    "name": "Windows Server 2022",
                    "data": {
                       "year": 2022,
                       "price": 595.99,
                       "CPU model": "Intel Core i7",
                       "Hard disk size": "2 TB",
                    }
                 }

                 cy.request({
                    method: 'POST',
                    url: 'https://api.restful-api.dev/objects',
                    failOnStateCode: false,
                    body: body_post 
                }).as('postDeviceResult')
    
                //validações
                cy.get('@postDeviceResult')
                    .then((response_post) =>{
                        console.log(response_post.body)
                        expect(response_post.body).not.empty
                        expect(response_post.status).equal(200)
                        expect(response_post.body.id).not.empty
   
   
                    cy.request({
                        method: 'PUT',
                       url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                       failOnStatusCode: false,
                       }).as('putDeviceResult')
   
                       //validações
                       cy.get('@putDeviceResult')
                           .then((response_put) => {
                               expect(response_put.status).equal(400)
                         })
   
        }) 
        })


        it('Alterando um dispositivo com a url incorreta', () =>{

        const body_put = {
           "name": "Windows Server 2024",
           "data": {
              "year": 2024,
              "price": 965.99,
              "CPU model": "Intel Core i8",
              "Hard disk size": "5 TB",
           }
        }

        const id_inexistente = 'teste'

        cy.request({
                method: 'PUT',
               url: `https://api.restful-api.dev/object/`,
               failOnStatusCode: false,
               body: body_put
               }).as('putDeviceResult')

               //validações
               cy.get('@putDeviceResult')
                   .then((response_put) => {
                       expect(response_put.status).equal(404)
                }) 

        }) 
})
