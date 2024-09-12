import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
import dbConfig from './db.json' with {type: "json"};
const currentEnv = dbConfig[env];

connection();
function connection() {
  let dbParameters = {
    host: currentEnv.host,
    user: currentEnv.user,
    password: currentEnv.password,
    database: currentEnv.data
  };
  // console.log(dbParameters);
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