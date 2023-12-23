const express = require("express")
const { signup, login, verifyToken, getUser, refreshToken, logout } = require("../controllers/user-controller")
const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/user", verifyToken, getUser)
router.post("/logout", verifyToken, logout)
// verify token
module.exports = router