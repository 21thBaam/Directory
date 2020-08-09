const folderBll = {}

folderBll.addFolderValidations = (req, res, next) => {
    const {folderName, description} = req.body;
    const patterns = /[a-zA-Z0-9 ]*/;

    if(folderName.length >= 4){
        console.log(folderName.match(patterns));
        if(!(folderName.match(patterns)[0] === folderName)){
            res.status(400).json({errorMessage: "Folder Name doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Folder Name doesn't hasn't the min length"});
        return false;
    }

    if(description.length >= 4){
        if(!(description.match(patterns)[0] === description)){
            res.status(400).json({errorMessage: "Description doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Description doesn't hasn't the min length"});
        return false;
    }

    next();
}

module.exports = folderBll;