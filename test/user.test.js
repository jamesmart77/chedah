//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/user");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);


describe("User", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Gig.remove({}, err => {
      done();
    });
  });
});
