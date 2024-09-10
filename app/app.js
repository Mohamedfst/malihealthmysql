import express from "express";
import bodyParser from 'body-parser';
import connection from "../db.js";
const app = express();
app.use(bodyParser.json()); //parsing

app.get('/',(req,res)=>{
    res.send("Hi");
})

app.post("/hcworkers", async (req, res) => {
    try {
        const {
        user_name,
        user_middlename, 
        user_lastname,
        user_dob,
        user_phone,
        user_emergencyNumber,
        user_email,
        user_address,
        user_medlicense,
        user_natlicense,
        user_languages,
        user_team,
        user_center,
        user_organization,
        user_role,
        user_photo
        } = req.body;
      const insertId = await connection.promise().query(
        `INSERT INTO hcworkers (user_name, user_middlename, user_lastname,user_dob,user_phone,user_emergencyNumber,user_email,user_address,user_medlicense,user_natlicense,user_languages,user_team,user_center,user_organization,user_role,user_photo) 
            VALUES (?, ?,?,?,?, ?,?,?,?, ?,?,?,?, ?,?,?)`,
        [user_name, user_middlename, user_lastname,user_dob,user_phone,user_emergencyNumber,user_email,user_address,user_medlicense,user_natlicense,user_languages,user_team,user_center,user_organization,user_role,user_photo]
      );
      res.status(201).json({
        message: insertId,
        data: {user_name, user_middlename, user_lastname,user_dob,user_phone,user_emergencyNumber,user_email,user_address,user_medlicense,user_natlicense,user_languages,user_team,user_center,user_organization,user_role,user_photo},
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  });

  app.get("/hcworkers", async(req, res) => {
    try {
        const data = await connection.promise().query(
          `SELECT *  from hcworkers;`
        );
        res.status(200).json({
          users: data[0],
        });
      } catch (err) {
        res.status(500).json({
          message: err,
        });
      }
});
export default app;
