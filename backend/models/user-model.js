const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        match: [/^[a-zA-Z0-9 ]+$/, "Username doesn't match with the format"],
        minlength: [4, "Username doesn't hasn't the min length"],
        maxlength: [45, "Username exceed max length"],
        required: [true, "An Username is required"],
        unique: [true, "That Username already taken"]
    },
    password: {
        type: String,
        minlength: [4, "Password doesn't hasn't the min length"],
        maxlength: [255, "Password exceed max length"],
        required: [true, "A Password is required"]
    },
    email: {
        type: String,
        match: [/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, "Email doesn't match with the format"],
        maxlength: [100, "Email exceed max length"],
        required: [true, "An Email is required"]
    },
},
    {
        timestamps: true
    });

module.exports = model("user", userSchema);