const express = require("express")
const dotenv = require("dotenv");
const dbConnect = require("./config/database");
const router = require("./routes/route")
const app = express();
dotenv.config();
const cors = require('cors')

const PORT = process.env.PORT;

// middlware to parse json body and cors for resource sharing
app.use(express.json());
app.use(cors());

//mounting user route
app.use("/api/v1", router);



//default route
app.get("/", (req, res)=>{
    res.send("Homepage baby");
})

dbConnect();

app.listen(PORT || 6000, ()=>{
    console.log("Server is up and running on port", PORT)
    
})