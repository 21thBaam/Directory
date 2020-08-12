const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const linkSchema = new Schema({
    idFolder: {
        type: String,
        required: [true, "A idFolder is required"]
    },
    idUsers: {
        type: String,
        required: [true, "A idUser is required"],
    },
    title: {
        type: String,
        match: [/^[a-zA-Z0-9 ]+$/, "Title doesn't match with the format"],
        minlength: [1, "Title doesn't hasn't the min length"],
        maxlength: [150, "Title exceed max length"],
        required: [true, "A Title is required"]
    },
    description: {
        type: String,
        match: [/^[a-zA-Z0-9@! ]+$/, "Description doesn't match with the format"],
        minlength: [1, "Description doesn't hasn't the min length"],
        maxlength: [255, "Description exceed max length"]
    },
    URL: {
        type: String,
        match: [/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
        "URL doesn't match with the format"],
        minlength: [4, "URL doesn't hasn't the min length"],
        maxlength: [255, "URL exceed max length"],
        require: [true, "An URL is required"]
    }
},
    {
        timestamps: true
    });

module.exports = model("links", linkSchema);