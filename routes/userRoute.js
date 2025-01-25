const express = require("express");
const Student = require("../models/student");

const router = express.Router();

//signup route
router.post("/signup",async (req, res) => {
    const {email, password} = req.body;

    try{
        const existingStudent = await Student.findOne({ email });
        if (existingStudent){
            return res.status(400).json({message : "Email already exists"});
        }

        const newStudent = new Student({
            email,
            password
        });

        await newStudent.save();
        res.status(201).json({message : "Student registered sucessfully"});
    }catch(e){
        console.log(e);
        res.status(5000).json({message : "server error"});
    }
})