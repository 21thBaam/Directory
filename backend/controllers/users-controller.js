const usersController = {};
const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

usersController.getUsers = (req, res) => {
    userModel.find({}, {_id: 0, username: 1}, (err, result) => {
        if(!err){
            res.json(result);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

usersController.getUser = (req, res) => {
    const {username, password} = req.body;
    userModel.find({username: {$regex : new RegExp(username, "i")}}, (err, result) => {
        if(!err){
            if(result.length > 0){
                bcrypt.compare(password, result[0]["password"], function(err, rest) {
                    if(rest){
                        const token = jwt.sign({idUsers: result[0]["_id"]}, process.env.KEY, { expiresIn: 60*60*2 } );
                        res.status(200).json({token});
                    }else{
                        res.status(400).json({errorMessage: "Wrong Password"});
                    }
                });
            }else{
                res.status(400).json({status: "Unauthorized Request", errorMessage: "Not founded"});
            }
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

usersController.addUser = (req, res) => {
    const {username, password, email} = req.body;
    const pattern = /[a-zA-Z0-9]*/;

    if(password.length >= 4){
        if(!(password.match(pattern)[0] === password)){
            res.status(400).json({errorMessage: "Password doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Password doesn't hasn't the min length"});
        return false;
    }

    bcrypt.hash(password, parseInt(process.env.SALTROUNDS), async function(err, hash) {
        if(err){
            console.log(err);
            return false;
        }
        const userAdd = await new userModel({username, password: hash, email}, (err) => {
            if(err){
                console.log(err);
                res.status(400).json({err});
            }
        });
        await userAdd.save((err) => {
            if(!err){
                res.json({status: "User Added"});
            }else{
                var messageError="";
                console.log(err);
                if(err["code"] == 11000){
                    res.status(400).json({errorMessage: "That Username already taken"});
                    return false;
                }
                for(let a in err["errors"]){
                    messageError += err["errors"][a]["properties"]["message"]+" ";
                }
                res.status(400).json({errorMessage: messageError});
            }
        });
    });
}

usersController.editUser = (req, res) => {
    /* const {idUsers} = req.params;
    const {username, password, email} = req.body;
    pool.query("UPDATE users SET username=?, password=?, email=? WHERE idUsers=?", [username, password, email, idUsers], (err) => {
        if(!err){
            res.json({status: "User Updated"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    }); */
}

usersController.deleteUser = (req, res) => {
    /* const {idUsers} = req.params;
    pool.query("DELETE FROM users WHERE idUsers=?", [idUsers], (err) => {
        if(!err){
            res.json({status: "User Deleted"});
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    }); */
}

module.exports = usersController;