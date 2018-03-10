//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Gig = require('../models/gig')
//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

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
  describe("/Gigs", () => {
    it("it should GET all the gigs", done => {
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

    // All of the post logic
    it("Should allow the creation of a gig", done => {
      let gig = {
        name: "programming",
        description: "I want to be a programmer",
        goals: []
      }
      chai.request(server.app)
      .post("/api/gigs")
      .send(gig)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("object");
        done();

      })
    })
  });
});