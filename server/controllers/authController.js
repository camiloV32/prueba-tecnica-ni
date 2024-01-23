//Import of Modules
const express = require("express");
const jwt = require("jsonwebtoken");

const authentication = require("../models/authentication.js");
//Creation of Instances
const router = express.Router();
const authObject = new authentication();
//Root url
const root_base = "/api/login";

//Use middleware
router.use(express.json());


//Login module
router.post(root_base,async(req, res)=>{
    req.body.password = atob(req.body.password)
    let data = await authObject.login(req.body);
    if(data[0].length==1){
        jwt.sign({user:data[0]},"#2{^0Jl$#x0P",{expiresIn:"300000ms"},(err,token)=>{
            res.json({
                token
            })
        });
    }else{
        res.json({message:"Incorrect user"});
    }
})

//Export module
module.exports = router;