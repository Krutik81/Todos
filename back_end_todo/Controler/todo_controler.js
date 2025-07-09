const express = require("express");
const todo_Schema = require("../Module/todo_list");

async function add_Todo(req, res) {
    const data = req.body;
    const data_2 = {
        title: data.add_Todo
    }
    console.log("🚀 ~ data_2:", data_2)
    console.log("🚀 ~ data:", data)
    // const data_2 = {
    //     title:data.add_Todo
    // }
    const respose = await todo_Schema.create(data_2)
    // res.send("Demo are check")
    res.status(200).json({
        message: "Your task are added"
    })
}

async function get_Todo(req, res) {
    try {
        const data = await todo_Schema.find();
        // console.log("🚀 ~ data:", data)
        res.status(200).json(data);
    }
    catch (error) {
        res.json({
            Error: error
        })
    }
}

async function delete_Todo(req, res) {
    try {
        console.log("dinchak", req.params.id);
        const query = { _id: req.params.id };
        const response = await todo_Schema.deleteOne(query)
        res.json({
            message: "Work are delete"
        })
    }
    catch (error) {
        res.json({
            message: error
        })
    }

}

async function add_complted(req, res) {
    // res.send(res.send(req.params.id))
    const temp_Data = req.body;
    const data = {
        completed: "true"
    }
    temp_Data.map((key, inex) => {
        console.log(key)
        save_change(key)
    })

    async function save_change(key) {
        const response = await todo_Schema.updateOne(
            {
                _id: key
            },
            {
                $set: data
            }
        )
    }
    res.send("Now")
}

// Edit user's todo title 
async function update_Todo_By_Id(req, res) {
    const user_Id = req.params.id
    const user_Data = req.body;
    console.log("🚀 ~ update_Todo_By_Id ~ user_Data:", user_Data)    
    const user_Edit_Title = user_Data.title;
    try {
        const todo_After_Update = await todo_Schema.updateOne(
            { _id: user_Id },
            {
                $set: {
                    title: user_Edit_Title
                }
            }
        )
        console.log("🚀 ~ update_Todo_By_Id ~ todo_After_Update:", todo_After_Update)
        if (todo_After_Update) {
            res.status(200).json({
                Message: "✅ Todo updated successfully"
            })
        }
        else {
            res.status(500).json({
                Message: "❌ Something are wrong"
            })
        }
    }
    catch (error) {
        res.status(400).json({
            Message: `Error :- ${error}`
        })
    }
    console.log("🚀 ~ update_Todo_By_Id ~ user_Id:", user_Id)

}

module.exports = {
    add_Todo,
    get_Todo,
    delete_Todo,
    add_complted,
    update_Todo_By_Id
}