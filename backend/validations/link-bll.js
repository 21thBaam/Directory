const linkBll = {}

linkBll.addEditValidator = (req, res, next) => {
    const { idFolder, title, description, URL } = req.body;
    const patterns = [/[a-zA-Z0-9 ]*/,
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/];
    
    if(title.length >= 4){
        if(!(title.match(patterns[0])[0] === title)){
            res.status(400).json({errorMessage: "Title doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Title doesn't hasn't the min length"});
        return false;
    }

    if(description.length >= 4){
        if(!(description.match(patterns[0])[0] === description)){
            res.status(400).json({errorMessage: "Title doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "Title doesn't hasn't the min length"});
        return false;
    }

    if(URL.length >= 4){
        if(!(URL.match(patterns[1])[0] === URL)){
            res.status(400).json({errorMessage: "URL doesn't match with the format"});
            return false;
        }
    }else{
        res.status(400).json({errorMessage: "URL doesn't hasn't the min length"});
        return false;
    }
    
    next();
}

module.exports = linkBll;