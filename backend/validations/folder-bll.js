const folderBll = {};
const pool = require("../database");
const {query} = require("express");
const jwt = require("jsonwebtoken");

folderBll.addFolderValidations = async (req, res, next) => {
    const {folderName, description} = req.body;
    const patterns = /[a-zA-Z0-9 ]*/;
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);

    if(folderName.length >= 4){
        if(!(folderName.match(patterns)[0] === folderName)){
            res.status(400).json({errorMessage: "Folder Name doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Folder Name doesn't hasn't the min length"});
        return false;
    }

    if(description.length >= 4){
        if(!(description.match(patterns)[0] === description)){
            res.status(400).json({errorMessage: "Description doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Description doesn't hasn't the min length"});
        return false;
    }

    pool.query("SELECT * FROM folders WHERE idUser=?", [idUsers], (err, rows) => {
        if(!err){
            for(let name in rows){
                if(folderName.toLowerCase() == rows[name]["folderName"].toLowerCase()){
                    res.status(400).json({errorMessage: "That folder name already exist"});
                    return false;
                }
            }
            next();
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
            return false;
        }
    });
}

module.exports = folderBll;