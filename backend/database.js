const mongoose = require("mongoose");

const URI = process.env.URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log("DB Connected"))
    .catch(err => console.log(err));

module.exports = mongoose;