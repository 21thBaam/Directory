const express = require("express");
const router = express.Router();

const links = require("../controllers/links-controller");

//Links
router.get("/", links.getLinks);
router.post("/", links.addLink);
router.put("/:idLinks", links.editLink);
router.delete("/:idLinks", links.deleteLink);

module.exports = router;