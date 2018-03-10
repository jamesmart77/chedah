process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Goal = require("../models/goal");
//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Goal", () => {
  beforeEach(done => {
    //Before each test we empty the database
    Goal.remove({}, err => {
      done();
    });
  });

  describe("/Goals", () => {
      it("Should get al lof the user data", done => {
          chai.request(server.app)
          .get("/api/goals/goals")
          .end((err, res) => {
              res.should.have.status(200);
              done();
          })     
      })
    })

});
