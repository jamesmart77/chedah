//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const User = require("../models/user");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);


describe("User", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.remove({}, err => {
      done();
    });
  });

    it("Should deny any unauthenticated user", done => {
      chai
        .request(server.app)
        .get("/api/users")
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  

});
