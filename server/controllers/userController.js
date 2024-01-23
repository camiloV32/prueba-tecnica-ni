//Import of Modules
const express = require("express");
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user.js");

//Creation of Instances
const userObject = new User();
const router = express.Router();

//Root url
const root_base = "/api/crud";

//Use middleware
router.use(express.json());

function verifyToken(req,res,next){
    const bearer = req.headers["authorization"];
    if(bearer !== undefined){
        req.token = bearer.split(" ")[1];
        jwt.verify(req.token,"#2{^0Jl$#x0P",(err,decoded)=>{
            if(err){
                res.status(400).json({message:"Invalid token"});
            }else{
                next();
            }
        });
        
    }else{
        res.status(400).json({message:"Invalid token"});
    }
}

//Create module
router.post(`${root_base}/create`,[
    //Validation fields and sanitizing data
    body("name","Enter your full name").exists().isLength({min:3}).toLowerCase().trim(),
    body("lastName","Enter your last name").exists().isLength({min:3}).toLowerCase().trim(),
    body("email","Enter your email").exists().isEmail().normalizeEmail({all_lowercase:true}).trim(),
    body("birthDate","Enter your birth day").exists(),
    body("password","Enter your password").exists().isLength({min:5}).trim()
],async (req,res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
    let user = req.body;
    let result = await userObject.create(user);
    if(result===false)res.status(400).json({message:"This user alredy exist"}); 
    else res.json({message:"Usuario creado exitosamente"}); 
});
//Read module
router.get(`${root_base}/read`,verifyToken,async (req,res)=>{
    let data = await userObject.read(req.params.page);
    res.json([...data[0]]);
});
//Update module
router.post(`${root_base}/update`,verifyToken,[
    //Validation fields and sanitizing data
    body("id","ID missing").exists(),
    body("name","Missing full name").exists().isLength({min:3}).toLowerCase().trim(),
    body("lastName","Missing last name").exists().isLength({min:3}).toLowerCase().trim(),
    body("email","Missing email").exists().isEmail().normalizeEmail({all_lowercase:true}).trim(),
    body("birthDate","Missing birth day").exists(),
    body("password").optional({values:"falsy"}).isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
    let user = req.body;
    let result = await userObject.update(user);
    if(result===false)res.status(400).json({message:"This email alredy in use"}); 
    else res.json({message:"Updated"});
});
//Delete module
router.post(`${root_base}/delete`,verifyToken,[
    //Validation fields and sanitizing data
    body("id","Missing ID").exists().notEmpty()
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(400).json({errors:errors.array()});
    await userObject.delete(req.body.id);
    res.json({message:"Deleted"});
});


//Export module
module.exports = router;