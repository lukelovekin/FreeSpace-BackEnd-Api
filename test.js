const app = require("./app")
const request = require("supertest")
const { assert, expect } = require("chai")
const TestPortfolio = require("./models/portfolio")
// const mocha = require('mocha')

// gets all portfolios
describe("/portfolios", () => {
    describe("GET /portfolios", () => {
        it("should get the portfolios", done => {
            request(app)
                .get('/portfolios')
                .expect(200)
                .end(function(error, response) {
                    if (error) return done(error)  
                        assert(response.body, [])
                        done()
                    })
        })    
    })

    // gets on database
    describe("GET /portfolios/:id", () => {
        it("should get a portfolio", done => {
            request(app)
                .get('/portfolios/:id')
                .expect(200)
                .end(function(error, response) {
                    if (error) return done(error)
                    assert(response.body, "")
                    done()
                })
        })
    })

    // post to portfolios (user: user._id breaks these two test)
    describe("POST /portfolios", () => {
        it("should save to the database", done => {
            request(app)
                .post('/portfolios')
                .send({"name": "james", "bio": "neeeded bio"}) 
                .expect(200, done)
                
        })
        it("should not save to the database", done => {
            request(app)
                .post("/portfolios")
                .send({"foo": "bar"})
                .expect(400, done)
        })
    })

    // deltes one portfolio
    describe("DELETE /portfolios/:id", () => {
        it("should delete the portfolio", done => {
            request(app)
                .del("/portfolios/1")
                .expect(200, done)
        })
    })
})


