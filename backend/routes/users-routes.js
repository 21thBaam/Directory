const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = require("../controllers/users-controller");

router.get("/", verifyToken, users.getUsers);
router.post("/", users.getUser);
router.post("/add/", users.addUser);
router.put("/:idUsers", users.editUser);
router.delete("/:idUsers", users.deleteUser);

//Verify Token
function verifyToken(req, res, next){
    try{
        if(!req.headers.authorization){
            return res.status("401").json({status: "Unauthorized Request"});
        }
        const token = req.headers.authorization.split(" ")[1];
        if(token === "null"){
            return res.status("401").json({status: "Unauthorized Request"});
        }
        const payload = jwt.verify(token, process.env.KEY);
        if(!payload){
            return res.status("401").json({status: "Unauthorized Request"});
        }
        console.log(payload);
        req.userId = payload.Usersid;
        next();
    }catch(e){
        return res.status("401").json({status: "Unauthorized Request"});
    }
}

module.exports = router;

//Expires 2 Hours
//jwt.verify(token, process.env.KEY, { expiresIn: 60*60*2});