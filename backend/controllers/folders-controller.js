const foldersController = {};
const folderModel = require("../models/folder-model");
const linkModel = require("../models/link-model");
const jwt = require("jsonwebtoken");

foldersController.getFolders = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);

    folderModel.find({idUsers: idUsers}, (err, result) => {
        if(!err){
            res.json(result);
        }else{
            console.log(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

foldersController.getFolder = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder} = req.params;
    folderModel.find({idUsers: idUsers, _id: idFolder}, (err, result) => {
        if(!err){
            res.json(result);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

foldersController.addFolder = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {folderName, description} = req.body;

    const folderAdd = await new folderModel({folderName, description, idUsers}, (err) => {
        if(err){
            console.log(err);
            res.status(400).json({err});
        }
    });

    const folder = await folderModel.find({idUsers: idUsers, folderName: folderName});

    if (folder.length <= 0) {
        await folderAdd.save((err) => {
            if (!err) {
                res.json({ status: "Folder Added" });
            } else {
                var messageError = "";
                console.log(err);
                /* if (err["code"] == 11000) {
                    res.status(400).json({ errorMessage: "That Folder name already exist" });
                    return false;
                } */
                for (let a in err["errors"]) {
                    messageError += err["errors"][a]["properties"]["message"] + " ";
                }
                res.status(400).json({ errorMessage: messageError });
            }
        });
    }else{
        res.status(400).json({ errorMessage: "That Folder name already exist" });
        return false;
    }
}

foldersController.editFolder = (req, res) => {
    const {idFolder} = req.params;
    const {folderName, description} = req.body;

    folderModel.update({_id:idFolder},{folderName, description}, { runValidators: true }, (err) => {
        if(!err){
            res.json({status: "Folder Updated"});
        }else{
            var messageError="";
            console.log(err);
            if(err["code"] == 11000){
                res.status(400).json({errorMessage: "That Folder name already exist"});
                return false;
            }
            for(let a in err["errors"]){
                messageError += err["errors"][a]["properties"]["message"]+" ";
            }
            res.status(400).json({errorMessage: messageError});
        }
    });
}

foldersController.deleteFolder = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder} = req.params;

    linkModel.remove({idFolder: idFolder, idUsers: idUsers}, (err) => {
        if(!err){
            folderModel.remove({_id: idFolder, idUsers: idUsers}, (err) => {
                if(!err){
                    res.json({ status: "Folder Deleted" });
                }else{
                    console.error(err);
                    res.status(401).json({ status: "Unauthorized Request", error: "Wrong Request" });
                }
            });
        }else{
            console.error(err);
            res.status(401).json({ status: "Unauthorized Request", error: "Wrong Request" });
        }
    });
}

module.exports = foldersController;