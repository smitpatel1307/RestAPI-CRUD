const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");


const studentSchema = new mongoose.Schema({
    name:{
        type : String,
        require:true,
        minlength:3
    },
    email:{
        type : String,
        require:true,
        unique:[true,"Email id already present."],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        min:10,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    }
})

//create new collection
const Student = new mongoose.model('Student',studentSchema);
module.exports = Student;