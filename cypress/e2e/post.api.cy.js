/// <reference types="cypress"/>

    describe('Cadastrar dispositivo', ()=>{
        
        it('Cadastrar um dispositivo com sucesso', ()=>{

            const body = {
                "name": "Windows 10",
                "data": {
                   "year": 2010,
                   "price": 999.99,
                   "CPU model": "Intel Core i5",
                   "Hard disk size": "1 TB"
                }
             }
             
             const dataAtual = new Date().toISOString().slice(0, 10)
             
            cy.request({
                method: 'POST',
                url: 'https://api.restful-api.dev/objects',
                failOnStatusCode: false,
                body: body 
            }).as('postDeviceResult')

            // validações
            cy.get('@postDeviceResult')
                .then((response) =>{

                    expect(response.body).not.empty
                    expect(response.status).equal(200)
                    expect(response.body.id).not.empty
                    expect(response.body.createdAt).not.empty
                    expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)

                    expect(response.body.data['CPU model']).not.empty
                    expect(response.body.data['CPU model']).equal('Intel Core i5')

                    expect(response.body.data['Hard disk size']).not.empty
                    expect(response.body.data['Hard disk size']).equal('1 TB')

                    expect(response.body.data.price).not.string
                    expect(response.body.data.price).equal(999.99)

                    expect(response.body.data.year).not.string
                    expect(response.body.data.year).equal(2010)
                    
                    

            })
        })
   
        it('Cadastrar um dispositivo sem body', ()=>{

                const body = {

                    "data": {
                       "year": 2010,
                       "price": 999.99,
                       "CPU model": "Intel Core i5",
                       "Hard disk size": "1 TB"
                    }
                }
                 
                 const dataAtual = new Date().toISOString().slice(0, 10)
                 
                cy.request({
                    method: 'POST',
                    url: 'https://api.restful-api.dev/objects',
                    failOnStatusCode: false,
     
                }).as('postDeviceResult')
    
                // validações
                cy.get('@postDeviceResult')
                    .then((response) =>{
    
                        expect(response.body).not.empty
                        expect(response.status).equal(400)


                        
                        
    
                })
        }) 
        
        it('Cadastrar um dispositivo com a url incorreta', ()=>{

                    const body = {
    
                        "data": {
                           "year": 2010,
                           "price": 999.99,
                           "CPU model": "Intel Core i5",
                           "Hard disk size": "1 TB"
                        }
                    }
                     
                     const dataAtual = new Date().toISOString().slice(0, 10)
                     
                    cy.request({
                        method: 'POST',
                        url: 'https://api.restful-api.dev/object',
                        failOnStatusCode: false,
                        body: body
         
                    }).as('postDeviceResult')
        
                    // validações
                    cy.get('@postDeviceResult')
                        .then((response) =>{
        
                            expect(response.body).not.empty
                            expect(response.status).equal(404)
    
    
                            
                            
        
                    })
        })
})