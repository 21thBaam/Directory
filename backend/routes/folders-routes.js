const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const folders = require("../controllers/folders-controller");

//Folders
router.get("/", verifyToken, folders.getFolders);
router.post("/", verifyToken, folders.addFolder);
router.put("/:idFolder", verifyToken, folders.editFolder);
router.delete("/:idFolder", verifyToken, folders.deleteFolder);

module.exports = router;