const express = require("express");
const router = new express.Router();
const Student = require('../models/student');
//Find all the students
router.get('/students',async(req,res)=>{
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(err){
        res.send(err);
    }
})

//Individual Students
router.get('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
       const studentData = await Student.findById({_id})
       if(!studentData){
           return res.status(404).send();
       }else{
           res.send(studentData);
       }
       res.send(studentsData);
    }catch(err){
        res.status(500).send(err);
    }
})

//update student by id
router.patch('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
     const updatedata = await  Student.findByIdAndUpdate(_id,req.body);
     res.send(updatedata);
    }catch(err){
        res.status(404).send(err);
    }
})

//delete student
router.delete('/students/:id',async(req,res)=>{
    try{
        const _id = req.params.id;
        const deletestudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        res.send(deletestudent);
    }catch(err){
        res.status(500).send(err);
    }
})




//Create a new Student
// app.post('/students',(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(()=>{
//         res.status(201).send(user);
//     }).catch((err)=>{
//         res.status(400).send(err);
//     })
// })

router.post('/students',async(req,res)=>{
    try{
        const user = new Student(req.body);

        const createUser = await user.save()
        res.status(201).send(createUser);
    }catch(err){
        res.status(400).send(err);
    }
})


module.exports = router; 