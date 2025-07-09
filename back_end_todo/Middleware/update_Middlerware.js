const express = require("express");
const mongoose = require("mongoose");
const todo_Schema = require("../Module/todo_list");

async function check_id(req, res, next) {
    try {
        const temp = { completed: "false" };
        const check_ID = req.body;

        // Validate and check all IDs in parallel
        await Promise.all(
            check_ID.map(async (value) => {
                // Check if ID format is valid
                if (!mongoose.Types.ObjectId.isValid(value)) {
                    console.log("❌ Invalid ObjectId:", value);
                    throw new Error(`Invalid ObjectId: ${value}`);
                }

                // Find the document
                const check_Id_2 = await todo_Schema.find({ _id: value });

                if (check_Id_2.length === 0) {
                    console.log("❌ No data found for ID:", value);
                    throw new Error(`ID not found: ${value}`);
                } else {
                    console.log("✅ Found document for ID:", value);
                }
            })
        );

        // If all IDs are valid and found, update them
        const response = await todo_Schema.updateMany(
            {},
            { $set: temp }
        );

        console.log("🔧 Updated documents count:", response.modifiedCount);

        next(); // Move to next middleware
    } catch (error) {
        console.error("🚨 Error in check_id middleware:", error.message);
        return res.status(400).json({ message: error.message });
    }
    next();
}

module.exports = check_id;
