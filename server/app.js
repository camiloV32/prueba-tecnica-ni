//Import of Modules
const express = require("express");
const cors = require('cors');

const authController = require("./controllers/authController.js");
const userController = require("./controllers/userController.js");


//Server port
const __PORT = 3000;

//Creation of Instances
const app = express();
app.use(cors());

//Use middleware
app.use(authController);
app.use(userController);
app.use(express.json())

app.listen(__PORT,()=>{
    console.log(`Running app in http://localhost:${__PORT}`);
});