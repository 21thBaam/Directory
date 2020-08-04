const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const users = require("../controllers/users-controller");

router.get("/", verifyToken, users.getUsers);
router.post("/", users.getUser);
router.post("/add/", users.addUser);
router.put("/:idUsers", verifyToken, users.editUser);
router.delete("/:idUsers", verifyToken, users.deleteUser);

module.exports = router;

//Expires 2 Hours
//jwt.verify(token, process.env.KEY, { expiresIn: 60*60*2});