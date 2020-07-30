if(process.env.NODE_ENV !== "production"){
	require("dotenv").config();
}

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());

//app.use(cors({origin: "http://localhost:4200"})); //Doubts
app.use(cors());

//routes
app.use("/api/users", require("./routes/users-routes"));
app.use("/api/folders", require("./routes/folders-routes"));
app.use("/api/links", require("./routes/links-routes"));

//starting the server
app.listen(app.get("port"), () => {
    console.log("Server on PORT ", app.get("port"));
});