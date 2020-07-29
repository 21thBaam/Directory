const linksController = {};
const pool = require("../database");
const {query} = require("express");

linksController.getLinks = (req, res) => {
    pool.query("SELECT * FROM links", (err, rows) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

linksController.addLink = (req, res) => {
    const {idFolder, idUser, title, description, URL} = req.body;
    pool.query("INSERT INTO links (idFolder, idUser, title, description, URL) VALUES(?, ?, ?, ?, ?)", [idFolder, idUser, title, description, URL], (err) => {
        if(!err){
            res.json({status: "Link Added"});
        }else{
            console.error(err);
            res.send(err);
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
            res.send(err);
        }
    });
}

linksController.deleteLink = (req, res) => {
    const {idLinks} = req.params;
    pool.query("DELETE FROM links WHERE idLinks=?", [idLinks], (err) => {
        if(!err){
            res.json({status: "Link Deleted"});
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

module.exports = linksController;