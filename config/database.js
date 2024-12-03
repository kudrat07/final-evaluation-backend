const mongoose = require('mongoose')
require('dotenv').config();

const URL = process.env.DATABASE_URL;

const dbConnect = async () => {
    
   await mongoose.connect(URL)
    .then(() => {
        console.log("Connected to DB successfully");
    }).catch((err) =>{
        console.error(err);
        console.log("Issue in DB connection");
    })

}
module.exports = dbConnect;