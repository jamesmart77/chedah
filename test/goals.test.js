process.env.NODE_ENV = "test";

const mongoose = require("mongoose");
const Goal = require("../models/goal");
//Require the dev-dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = require("chai").expect;
const request = require("supertest");

chai.use(chaiHttp);


const userCredentials = {
  email: "sponge@bob.com",
  password: "garyTheSnail"
};
const authUser = request.agent(server.app);




describe("Goal", () => {


  it("Should give us all of the goals", (done)=>{
    chai.request(server.app)
    .get("/api/goals")
    .end((err, res)=>{
      expect(res).to.have.status(401);
      done();

    })
  })

});
