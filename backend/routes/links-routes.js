const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const links = require("../controllers/links-controller");

//Links
router.get("/:idFolder", verifyToken, links.getLinks);
router.post("/", verifyToken, links.addLink);
router.put("/:idLinks", verifyToken, links.editLink);
router.delete("/:idLinks", verifyToken, links.deleteLink);

module.exports = router;