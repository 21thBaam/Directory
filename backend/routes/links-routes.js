const express = require("express");
const router = express.Router();
const verifyToken = require("./verifyToken");

const links = require("../controllers/links-controller");
const linkBll = require("../validations/link-bll");

//Links
router.get("/:idFolder", verifyToken, links.getLinks);
router.get("/getLink/:idLinks", verifyToken,links.getLink);
router.post("/", verifyToken, linkBll.addEditValidator, links.addLink);
router.put("/:idLinks", verifyToken, linkBll.addEditValidator, links.editLink);
router.delete("/:idLinks", verifyToken, links.deleteLink);

module.exports = router;