import app from './app/app.js'; // Our app
import 'dotenv/config'; 

const PORT = process.env.PORT;


// Start the server
app.listen(PORT, () => {
  console.log("Server is running in mode:", process.env.NODE_ENV);
});