const mongoose = require("mongoose");
const env = require("dotenv");

env.config()

const db_string = process.env.DB_STRING;
const port = process.env.DB_PORT;

if (!db_string) {
    console.log("You have not connect to database so pleace try again")
}
else {
    mongoose.connect(db_string)
        .then((data) => { console.log("connected to db") })
        .catch((error) => {console.log("Db connection error",error)})
}

module.exports = port;