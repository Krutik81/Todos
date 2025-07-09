const express = require("express");
const route = express.Router();
const {add_Todo,get_Todo,delete_Todo,add_complted,update_Todo_By_Id} = require("../Controler/todo_controler");
const check_id  = require("../Middleware/update_Middlerware");

route.post("/", add_Todo);

route.get("/", get_Todo)

// route.delete("/:id", (req, res) => {
//     console.log(req.params.id)
// })

route.delete("/:id", delete_Todo);

// route.put("/:id", (req, res) => {
//     console.log("yes,",req.params.id)
// })

route.put("/", check_id, add_complted)

route.put("/edit/:id",update_Todo_By_Id)

module.exports = route;