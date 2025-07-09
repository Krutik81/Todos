const express = require("express");
const app = express();
const port = require("./connect_to_db/connect_db");
const add_Route = require("./Routes/add_Todo_Route")
const cors = require("cors");

app.use(cors());
app.use(express.json())


app.use("/", add_Route)
app.get("/",(req,res) => {
    res.send("Test")
})
app.listen(port, () => {
    console.log("connect to server ")
})