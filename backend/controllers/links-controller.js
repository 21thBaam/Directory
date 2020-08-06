const linksController = {};
const pool = require("../database");
const {query} = require("express");
const jwt = require("jsonwebtoken");

linksController.getLinks = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder} = req.params;
    
    pool.query("SELECT * FROM links WHERE idFolder=? AND idUser=?", [idFolder, idUsers], (err, rows) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

linksController.getLink = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idLinks} = req.params;

    pool.query("SELECT * FROM links WHERE idLinks=? AND idUser=?", [idLinks, idUsers], (err, rows) => {
        if(!err){
            console.log(rows);
            res.json(rows);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

linksController.addLink = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder, title, description, URL} = req.body;
    pool.query("INSERT INTO links (idFolder, idUser, title, description, URL) VALUES(?, ?, ?, ?, ?)", [idFolder, idUsers, title, description, URL], (err) => {
        if(!err){
            res.json({status: "Link Added"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

linksController.editLink = (req, res) => {
    const {idLinks} = req.params;
    const {idFolder, title, description, URL} = req.body;
    pool.query("UPDATE links SET idFolder=?, title=?, description=?, URL=? WHERE idLinks=?", [idFolder, title, description, URL, idLinks], (err) => {
        if(!err){
            res.json({status: "Link Updated"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

linksController.deleteLink = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idLinks} = req.params;
    pool.query("DELETE FROM links WHERE idLinks=? AND idUser=?", [idLinks, idUsers], (err) => {
        if(!err){
            res.json({status: "Link Deleted"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

module.exports = linksController;