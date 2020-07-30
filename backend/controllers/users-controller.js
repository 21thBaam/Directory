const usersController = {};
const pool = require("../database");
const {query} = require("express");

usersController.getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

usersController.addUser = (req, res) => {
    const {username, password, email} = req.body;
    pool.query("INSERT INTO users(username, password, email) VALUES(?, ?, ?)", [username, password, email], (err) => {
        if(!err){
            res.json({status: "User Added"});
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

usersController.editUser = (req, res) => {
    const {idUsers} = req.params;
    const {username, password, email} = req.body;
    pool.query("UPDATE users SET username=?, password=?, email=? WHERE idUsers=?", [username, password, email, idUsers], (err) => {
        if(!err){
            res.json({status: "User Updated"});
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

usersController.deleteUser = (req, res) => {
    const {idUsers} = req.params;
    pool.query("DELETE FROM users WHERE idUsers=?", [idUsers], (err) => {
        if(!err){
            res.json({status: "User Deleted"});
        }else{
            console.error(err);
            res.send(err);
        }
    });
}

module.exports = usersController;