// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Gig = require('../models/gig')
// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = require('chai').expect

chai.use(chaiHttp)

describe('Gigs', () => {
  beforeEach(done => {
    // Before each test we empty the database
    Gig.remove({}, err => {
      done()
    })
  })

  /*
  * Test the /GET route
  */

  it('Should deny the user from the gigs', done => {
    chai.request(server.app)
      .get('/api/gigs')
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
  })
})
