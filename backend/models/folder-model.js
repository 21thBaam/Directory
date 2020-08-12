const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const folderSchema = new Schema({
    idUsers: {
        type: String,
        required: [true, "An idUser is required"],
    },
    folderName: {
        type: String,
        match: [/^[a-zA-Z0-9 ]+$/, "Folder Name doesn't match with the format"],
        minlength: [1, "Folder name doesn't hasn't the min length"],
        maxlength: [150, "Folder name exceed max length"],
        required: [true, "A Folder name is required"]
    },
    description: {
        type: String,
        match: [/^[a-zA-Z0-9@! ]+$/, "Description doesn't match with the format"],
        minlength: [1, "Description doesn't hasn't the min length"],
        maxlength: [150, "Description exceed max length"]
    }
},
    {
        timestamps: true
    });

module.exports = model("folders", folderSchema);