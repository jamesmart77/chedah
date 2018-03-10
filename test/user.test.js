//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const User = require("../models/user");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);


describe("User", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Gig.remove({}, err => {
      done();
    });
  });

});
