import app from './app/app.js'; // Our app
import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV;
import dbConfig from './db.json' with {type: "json"};
const currentEnv = dbConfig[env];

app.listen(currentEnv.port,() => {
  console.log(`APP LISTENING ON http://${currentEnv.host}:${currentEnv.port}`);
})