//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Gig = require('../models/gig')
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe("Gigs", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Gig.remove({}, err => {
      done();
    });
  });

  /*
  * Test the /GET route
  */
  describe("/ Gigs", () => {
    it("it should GET all the books", done => {
      chai
        .request(server.app)
        .get("/api/gigs")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});