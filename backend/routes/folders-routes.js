const express = require("express");
const router = express.Router();

const folders = require("../controllers/folders-controller");

//Folders
router.get("/", folders.getFolders);
router.post("/", folders.addFolder);
router.put("/:idFolder", folders.editFolder);
router.delete("/:idFolder", folders.deleteFolder);

module.exports = router;