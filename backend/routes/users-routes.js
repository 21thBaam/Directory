const express = require("express");
const router = express.Router();

const users = require("../controllers/users-controller");

router.get("/", users.getUsers);
router.post("/", users.addUser);
router.put("/:idUsers", users.editUser);
router.delete("/:idUsers", users.deleteUser);

module.exports = router;