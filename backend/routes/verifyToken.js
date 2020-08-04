const jwt = require("jsonwebtoken");
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
        req.userId = payload.Usersid;
        next();
    }catch(e){
        return res.status("401").json({status: "Unauthorized Request"});
    }
}

module.exports = verifyToken;