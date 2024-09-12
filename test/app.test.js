import chai, { expect } from "chai"; 
import chaiHttp from "chai-http";
import app from "../app/app.js"; // Our app
import connection from "../db.js";
import _ from "lodash";
import dbConfig from '../db.json' with {type: "json"};
const testUser = dbConfig.testUser;

chai.use(chaiHttp);

let result; // global result to not have to add two times a worker at POST - Add new worker
describe("API endpoints", () => {
  beforeEach(async () => {
    await clearDb();
     //result = await chai.request(app).post("/hcworkers").send(testUser); // before each test case, add a new worker.
    });

  afterEach(async () => {
    //const rest = await chai.request(app).delete("/hcworkers"); // after each test case, empty the database.
    
  });

  // GET - List all health care workers
  it("should return all the health care workers", async () => {
    const try1 = await addNewHcWorker();
    console.log(try1);
    const httpResponse = await chai.request(app).get("/hcworkers");
    expectHttpResponseCodeToBe(200, httpResponse);
    console.log("response ->",httpResponse);
    expect(Object.keys(data).length).to.equal(Object.keys(testUser).length);
    if(Object.keys(data).length == Object.keys(testUser).length){
      let result = _.isEqual(
        _.omit(data, ['id', 'created_at', 'user_photo']),
        _.omit(testUser, ['id', 'created_at','user_photo'])
      );
      expect(result).to.be.true; // testing the result
    }
    
  });

  // GET - Invalid path
  it("should return Not Found", async () => {
    const res = await chai.request(app).get("/INVALID_PATH");
    expect(res).to.have.status(404);
  });

  // POST - Add new worker 
  it("should add a new worker", async () => {
    let parseResult = JSON.parse(result.text);
    let data = parseResult.data;
    let changeMade = parseResult.message[0].affectedRows;
    expect(result).to.have.status(201);
    expect(result).to.be.json;
    expect(result.body).to.be.an("object");
    expect(changeMade).to.equal(1);
    if(Object.keys(data).length == Object.keys(testUser).length){
      let result = _.isEqual(
        _.omit(data, ['id', 'created_at', 'user_photo']),
        _.omit(testUser, ['id', 'created_at', 'user_photo'])
      );
      expect(result).to.be.true; // testing the result
    } else {
      return false;
    }
  });

  // POST - Bad Request
  it("should return Bad Request", async () => {
    const res = await chai.request(app).post("/hcworkers").type("form").send({
      color: "YELLOW"
    });
    expect(res).to.have.status(400);
  });
});
async function addNewHcWorker() {
  return await chai.request(app).post("/hcworkers").send(testUser);
}

function expectHttpResponseCodeToBe(expectedHttpCode, httpResponse) {
  expect(httpResponse).to.have.status(expectedHttpCode);
  expect(httpResponse).to.be.json;
  expect(httpResponse.body).to.be.an("object");
}

async function clearDb() {
  try {
    const data = await connection.promise().query(
      `DELETE from hcworkers;`
    );
  } catch (err) {
    err;
  }
}

