const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getName,
  getRemainingSubjects
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId/getuser", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId/updateuser", isSignedIn, isAuthenticated, updateUser);
router.get("/user/get/name/:userId",getName);
router.get("/section/user/remaining/:userId",getRemainingSubjects);

// router.post("/user/:userId/blockedusers",isSignedIn,isAuthenticated,getBlockedUsers);


module.exports = router;
