var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn,CheckMobileExists, createPhone } = require("../controllers/auth");
const User = require("../models/user");

router.post(
  "/signup",
  [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 3 })
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password field is required").isLength({ min: 1 })
  ],
  signin
);

router.post("/section/add/remainingsubjects",(req,res)=>{
  console.log(req.body);
  User.updateMany({section:req.body.section.s_name},{$push:{remainingSubjects:req.body.subject}}).exec((err,data)=>{
    if(err){
      return res.json("error")
    }
    else{
      return res.json(data);
    }
  })

})

router.get("/signout", signout);

module.exports = router;
