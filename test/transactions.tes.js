process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Transaction = require("../models/transaction");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Transactions", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Transaction.remove({}, err => {
      done();
    });
  });
});
