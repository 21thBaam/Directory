const userBll = {};

userBll.getUserValidations = (req, res, next) => {
    const {username, password} = req.body;
    const patterns = [/[a-zA-Z0-9 ]*/, /[a-zA-Z0-9]*/];
    if(username.length >= 4){
        if(!(username.match(patterns[0])[0] === username)){
            res.status(400).json({errorMessage: "Username doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Username doesn't hasn't the min length"});
        return false;
    }
    if(password >= 4){
        if(!(password.match(patterns[1])[0] === password)){
            res.status(400).json({errorMessage: "Password doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Password doesn't hasn't the min length"});
        return false;
    }
    next();
}

/* userBll.globalValidator = (inputs, res, patterns, messages) => {
    for(var i=0; i<inputs.length; i++){
        if(!(inputs[i].match(patterns[i])[0] === inputs[i])){
            console.log(messages[i]);
        }
    }
} */

module.exports = userBll;