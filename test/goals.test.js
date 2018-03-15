process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Goal = require("../models/goal");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = require("chai").expect;
const request = require("request");

chai.use(chaiHttp);


describe("Goal", () => {
  it("Should deny us from the goals because of the lack of header", (done)=>{
    chai.request(server.app)
    .get("/api/goals")
    .end((err, res)=>{
      expect(res).to.have.status(401);
      done();
    })
  });
});
