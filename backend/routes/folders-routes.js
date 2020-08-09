const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const folders = require("../controllers/folders-controller");
const folderBll = require("../validations/folder-bll");

//Folders
router.get("/", verifyToken, folders.getFolders);
router.get("/:idFolder", verifyToken, folders.getFolder);
router.post("/", verifyToken, folderBll.addFolderValidations, folders.addFolder);
router.put("/:idFolder", verifyToken, folderBll.addFolderValidations, folders.editFolder);
router.delete("/:idFolder", verifyToken, folders.deleteFolder);

module.exports = router;