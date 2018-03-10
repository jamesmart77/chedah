process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Transaction = require("../models/transaction");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);

describe("Transactions", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Transaction.remove({}, err => {
      done();
    });
  });

});
