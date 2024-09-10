import mysql from 'mysql2';
import 'dotenv/config';

connection();

function connection() {
  let dbParameters = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  };
  console.log(dbParameters);
  let connection = mysql.createConnection(dbParameters);
  //connect to mysql
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
  return connection;
}
export default connection;