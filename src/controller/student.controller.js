"use strict";
const student = require('../models/student');

exports.find = function(req,res){
    student.find(function(err,students){
        if(err) return res.send(err);
        else return res.send(students)
    })
}
exports.findById = function (req, res) {
    if (!req.params.id) {
      return res.status(400).send({ error: true, message: "Bad Request" });
    }
    student.findById(req.params.id, function (err, students) {
      if (err)
        return res
          .status(400)
          .send({ error: true, message: "Error in find user by Id" });
      else return res.json(students);
    });
  };


exports.create = function (req, res) {
    const new_student = new student(req.body);
    //handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ error: true, message: "Please provide all required field" });
    } else {
      student.create(new_student, function (err, user) {
        if (err)
          return res.status(422).json({ code: err.code, error: err.sqlMessage });
        else
          return res.json({
            code: "OK",
            message: "Student added successfully!",
            data: user,
          });
      });
    }
  };

  exports.findByIdAndDelete = async(req,res)=>{
    try{
        const _id = req.params.id;
        const deletestudent = await student.findByIdAndDelete(_id);
        if(!req.params.id){
            return res.status(400).send();
        }
      return  res.send(deletestudent);
    }catch(err){
        res.status(500).send(err);
    }
}

exports.findByIdAndUpdate = async(req,res)=>{
    try{
        const _id = req.params.id;
     const updatedata = await student.findByIdAndUpdate(_id,req.body);
    res.send("Record updated");
    }catch(err){
        res.status(404).send(err);
    }
}