const foldersController = {};
const pool = require("../database");
const {query} = require("express");
const jwt = require("jsonwebtoken");

foldersController.getFolders = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    pool.query("SELECT * FROM folders WHERE idUser=?", [idUsers], (err, rows) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

foldersController.addFolder = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {folderName, description} = req.body;
    pool.query("INSERT INTO folders (idUser, folderName, description) VALUES (?, ?, ?)", [idUsers, folderName, description], (err) => {
        if(!err){
            res.json({status: "Folder Added"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

foldersController.editFolder = (req, res) => {
    const {idFolder} = req.params;
    const {folderName, description} = req.body;
    pool.query("UPDATE folders SET folderName=?, description=? WHERE idFolder=?", [folderName, description, idFolder], (err) => {
        if(!err){
            res.json({status: "Folder Updated"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

foldersController.deleteFolder = (req, res) => {
    const {idFolder} = req.params;
    pool.query("DELETE FROM folders WHERE idFolder=?", [idFolder], (err) => {
        if(!err){
            res.json({status: "Folder Deleted"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

module.exports = foldersController;