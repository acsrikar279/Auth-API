const Guid = require('guid');

describe('/user/register', ()=>{
    const registerEndpoint = 'http://localhost:3000/api/user/register';
    it('creates user with valid data', ()=>{
        let dynamicEmail = Guid.raw() + '@email.com';
        let body = {
            name: "ValidTest",
            email: dynamicEmail,
            password: "Testpass"
        }
        cy.request('POST', registerEndpoint, body)
        .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq("ValidTest");
            expect(response.body.email).to.eq(dynamicEmail);
            expect(response.body.password).to.eq("Testpass");
        })
    })
    
    it('returns 400 when we hit /register without no body', ()=>{
        cy.request({
            method: "POST",
            url: registerEndpoint,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

    it('doesnt allow user with bad body', ()=>{
        let badBody = {
            name: "23",
            email: "Tem",
            password: "s"
        }
        cy.request({
            method: "POST",
            url: registerEndpoint,
            body: badBody,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })

})

