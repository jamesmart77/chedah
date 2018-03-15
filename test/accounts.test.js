// During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const mongoose = require('mongoose')
const Account = require('../models/account')
// Require the dev-dependencies
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const should = chai.should()
const expect = require('chai').expect

chai.use(chaiHttp)

describe('Accounts', () => {
  beforeEach(done => {
    // Before each test we empty the database
    Account.remove({}, err => {
      done()
    })
  })
  /*
  * Test the /GET route
  */

  it('Should deny any unauthenticated user from the accounts', done => {
    chai.request(server.app)
      .get('/api/accounts')
      .end((err, res) => {
        expect(res).to.have.status(401)
        done()
      })
  })
})
