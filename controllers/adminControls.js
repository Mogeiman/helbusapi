const express = require('express')
const {Users} = require('../models')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
require('dotenv').config('./.env')

//Adding Users
exports.addUsers = async (req, res) => {
  let { name, email, password, license} = req.body
    name= name.trim()
    email = email.trim()
    password = password.trim()
    license = license.trim()

    if(name == "" || email == "" || password == "" || license == ""){
      res.json({
          status: "FAILED",
          message: "empty input fields"
      })
  }else if (!/^[a-zA-Z]*$/.test(name)){
      res.json({
          status: "FAILED",
          message: "Invalid name entered"
      }) }
      else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short"
        }) 
    }else{
       const userExists = await Users.findOne({where:{email:email}})
            if(!userExists){
               bcrypt.hash(password, 10).then((hash)=>{
                Users.create({
                  name,
                  email,
                  password: hash,
                  license,
              });
              res.json({
                status: "SUCCESS",
                message: "SIGNUP SUCCESSFUL",
                data: userExists
            }) 
            })
            }else{
              res.json({
                status: "FAILED",
                message: "User already exists"
            }) 
            }
          }
       
  
};




exports.login = async(req, res) => {
  let { email, password} = req.body;
  email = email.trim()
  password = password.trim()
  if(email == "" || password == ""){
      res.json({
          status: "FAILED",
          message: "empty input fields"
      })
  }
   //get all the admin where username equals what was submitted
   const userExists = await Users.findOne({where:{email:email}})
   if(!userExists){
    res.json({
      status: "FAILED",
      message: "invalid credentials"
  })   }
   //comparing the passwords
   bcrypt.compare(password, userExists?.password).then((match)=>{
    if(!match){
      res.json({
        status: "FAILED",
        message: "Password is wrong"
    })}else{
    const id = userExists.id
    const token = jwt.sign({id},process.env.TOKEN_SECRET, {expiresIn:3000,})
    //starting a session * still don't understand
    req.session.user = userExists
    req.session.token = token
    res.json({
      status: 'Success',
      message: "Sign in successful",
    })    
    }
   
   })

}
// Start a session if req.session.user has been set
exports.loginSession = (req,res) => {
  const {token, user} = req.session
  if(user){
    res.json({
      loggedIn: true,
      token,
      user
      })
  }else{
    res.json({loggedIn: false})
    
  }
}

// exports.allUsers = (req, res) =>{
//   Users.findAll({
//     attributes: ['id', 'username','password'],
//     include:[Files]
//   }).then(user => {
// 	  res.json(user);
// 	});
// }


// //Loging out by destroying the session
exports.logOut = (req, res) => {
  req.session.destroy()
  res.json({loggedIn: false,message:"You have been logged Out"});

}