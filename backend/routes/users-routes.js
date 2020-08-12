const express = require("express");
const router = express.Router();
//const verifyToken = require("./verifyToken");

const users = require("../controllers/users-controller");

router.get("/", users.getUsers);
router.post("/", users.getUser);
router.post("/add/", users.addUser);
//router.put("/:idUsers", verifyToken, users.editUser);
//router.delete("/:idUsers", verifyToken, users.deleteUser);

module.exports = router;