const app= require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database.js");
const cloudinary = require("cloudinary");


//handling Uncaught Exception
process.on("uncaughtException",(err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down server due to uncaught exception error`);
  process.exit(1);
});


//config

require("dotenv").config({ path: "backend/config/config.env" });




//connectDatabase

connectDatabase()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});



// unhandled promise rejection
// shutting down server

process.on("unhandledRejection",(err) =>{

  console.log(`Error: ${err.message}`);
  console.log(`shutting down server due to unhandled promise regection`);
  
  server.close(() =>{
    process.exit(1);
  });

});