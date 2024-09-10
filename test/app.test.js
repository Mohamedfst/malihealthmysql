import chai, { expect } from "chai"; 
import chaiHttp from "chai-http";
import app from "../app/app.js"; // Our app
import connection from "../db.js";
import _ from "lodash";

chai.use(chaiHttp);

const testUser = {
  "id": "",
  "user_name": "testusermocha",
  "user_middlename": "", 
  "user_lastname": "Keita",
  "user_dob": "01/03/3000",
  "user_phone": "510-282-4142",
  "user_emergencyNumber": "415-640-0262",
  "user_email": "testusermocha@malimail.com",
  "user_address": "hdkdpw8*sWkL!NSkpEq",
  "user_medlicense": "Q23qrd07",
  "user_natlicense": "US032489",
  "user_languages": "English, Spanish",
  "user_team": "Community Worker",
  "user_center": "Concord CSCOM",
  "user_organization": "CSCOM",
  "user_role": "Care Provider",
  "user_photo": "Ariel Photo",
  "created_at": ""
  };
let result; // global result to not have to add two times a worker at POST - Add new worker
describe("API endpoints", () => {
  beforeEach(async () => {
     result = await chai.request(app).post("/hcworkers").send(testUser); // before each test case, add a new worker.
    });

  afterEach(async () => {
    //const rest = await chai.request(app).delete("/hcworkers"); // after each test case, empty the database.
    try {
      const data = await connection.promise().query(
        `DELETE from hcworkers;`
      );
    } catch (err) {
      err;
    }
  });

  // GET - List all health care workers
  it("should return all the health care workers", async () => {
    const res = await chai.request(app).get("/hcworkers");
    let parseResult = JSON.parse(res.text);
    let data = parseResult.users[0];
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.be.an("object");
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
