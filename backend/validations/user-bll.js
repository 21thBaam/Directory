const userBll = {};
const pool = require("../database");
const {query} = require("express");

userBll.getUserValidations = (req, res, next) => {
    const {username, password} = req.body;
    const patterns = [/[a-zA-Z0-9 ]*/, /[a-zA-Z0-9]*/];
    if(username.length >= 4){
        if(!(username.match(patterns[0])[0] === username)){
            res.status(400).json({errorMessage: "Username doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Username doesn't hasn't the min length"});
        return false;
    }
    if(password.length >= 4){
        if(!(password.match(patterns[1])[0] === password)){
            res.status(400).json({errorMessage: "Password doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Password doesn't hasn't the min length"});
        return false;
    }
    next();
}

userBll.addUserValidation = (req, res, next) => {
    const {username, password, email} = req.body;
    const patterns = [/[a-zA-Z0-9 ]*/, /[a-zA-Z0-9]*/, /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/];
    if(username.length >= 4){
        if(!(username.match(patterns[0])[0] === username)){
            res.status(400).json({errorMessage: "Username doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Username doesn't hasn't the min length"});
        return false;
    }
    if(password.length >= 4){
        if(!(password.match(patterns[1])[0] === password)){
            res.status(400).json({errorMessage: "Password doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Password doesn't hasn't the min length"});
        return false;
    }

    if(email.length >= 4){
        if(!(email.match(patterns[2])[0] === email)){
            res.status(400).json({errorMessage: "Email doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Email doesn't hasn't the min length"});
        return false;
    }

    pool.query("SELECT username FROM users WHERE username=?", [username], (err,rows) => {
        if(!err){
            if(rows.length > 0){
                res.status(400).json({errorMessage: "That Username already exist"});
                return false;
            }
            next();
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
            return false;
        }
    });
}

module.exports = userBll;