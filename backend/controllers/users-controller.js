const usersController = {};
const pool = require("../database");
const {query} = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

usersController.getUsers = (req, res) => {    
    pool.query("SELECT * FROM users", (err,rows) => {
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

usersController.getUser = (req, res) => {
    const {username, password} = req.body;
    pool.query("SELECT * FROM users WHERE username=?", [username], (err,rows) => {
        if(!err){
            if(rows.length > 0){
                bcrypt.compare(password, rows[0]["password"], function(err, result) {
                    if(result){
                        const token = jwt.sign({idUsers: rows[0]["idUsers"]}, process.env.KEY, { expiresIn: 60*60*2 } );
                        res.status(200).json({token});
                    }else{
                        res.status(400).json({errorMessage: "Wrong Password"});
                    }
                });
            }else{
                res.status(401).json({status: "Unauthorized Request", error: "Not founded"});
            }  
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

usersController.addUser = (req, res) => {
    const {username, password, email} = req.body;
    bcrypt.hash(password, parseInt(process.env.SALTROUNDS), function(err, hash) {
        pool.query("INSERT INTO users(username, password, email) VALUES(?, ?, ?)", [username, hash, email], (err) => {
            if(!err){
                res.json({status: "User Added"});
            }else{
                console.error(err);
                res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
            }
        });
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
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
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
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

module.exports = usersController;