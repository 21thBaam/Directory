const linksController = {};
const linkModel = require("../models/link-model");
const jwt = require("jsonwebtoken");

linksController.getLinks = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder} = req.params;
    
    linkModel.find({idUsers: idUsers, idFolder: idFolder}, (err, result) => {
        if(!err){
            res.json(result);
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

    linkModel.find({_id: idLinks, idUsers: idUsers}, (err, result) => {
        if(!err){
            res.json(result);
        }else{
            console.error(err);
            res.status(401).json({status: "Unauthorized Request", error: "Wrong Request"});
        }
    });
}

linksController.addLink = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idFolder, title, description, URL} = req.body;

    const linkAdd = await new linkModel({idFolder, idUsers, title, description, URL}, (err) => {
        if(err){
            console.log(err);
            res.status(400).json({err});
        }
    });

    await linkAdd.save((err) => {
        if(!err){
            res.json({status: "Link Added"});
        }else{
            var messageError="";
            console.log(err);
            for(let a in err["errors"]){
                messageError += err["errors"][a]["properties"]["message"]+" ";
            }
            res.status(400).json({errorMessage: messageError});
        }
    });
}

linksController.editLink = (req, res) => {
    const {idLinks} = req.params;
    const {idFolder, title, description, URL} = req.body;

    linkModel.update({_id: idLinks}, {idFolder, title, description, URL}, {runValidators: true}, (err) => {
        if(!err){
            res.json({status: "Link Updated"});
        }else{
            var messageError="";
            console.log(err);
            for(let a in err["errors"]){
                messageError += err["errors"][a]["properties"]["message"]+" ";
            }
            res.status(400).json({errorMessage: messageError});
        }
    });
}

linksController.deleteLink = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {idUsers} = jwt.verify(token, process.env.KEY);
    const {idLinks} = req.params;

    linkModel.remove({_id: idLinks, idUsers: idUsers}, (err) => {
        if(!err){
            res.json({ status: "Link Deleted" });
        }else{
            console.error(err);
            res.status(401).json({ status: "Unauthorized Request", error: "Wrong Request" });
        }
    });
}

module.exports = linksController;