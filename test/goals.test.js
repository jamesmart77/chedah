process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Goal = require("../models/goal");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);

describe("Goal", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Goal.remove({}, err => {
      done();
    });
  });

});
