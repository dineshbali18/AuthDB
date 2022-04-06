const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId/getuser", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId/updateuser", isSignedIn, isAuthenticated, updateUser);

// router.post("/user/:userId/blockedusers",isSignedIn,isAuthenticated,getBlockedUsers);


module.exports = router;
