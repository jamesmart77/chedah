//During the test the env variable is set to test
process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Account = require("../models/account");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Gigs", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Account.remove({}, err => {
      done();
    });
  });
  /*
  * Test the /GET route
  */
});
