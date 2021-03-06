const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.encry_password=undefined;
    req.salt=undefined;
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.phone=undefined;
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};


exports.getRemainingSubjects=(req,res)=>{
  User.findById({_id:req.profile._id}).exec((err,data)=>{
    if(err){
      return res.json("User remaining sub not found")
    }
    else{
      return res.json(data.remainingSubjects)
    }
  })
}

exports.getName=(req,res)=>{
  console.log(req.profile)
  return res.json(req.profile.name);
}