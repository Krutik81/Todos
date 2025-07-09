const express = require("express");
const mongoose = require("mongoose");

const todo_Schema_2 = new mongoose.Schema({
    title: {
        required: true,
        type: String,
        trim:true 
    },
    completed: {
        type: Boolean,
        default:false    
    }
},{timestamps:true})

const todo_Schema = mongoose.model('todo_task', todo_Schema_2);

module.exports = todo_Schema;
