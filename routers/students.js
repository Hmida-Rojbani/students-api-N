const express = require('express')
const _ = require('lodash')
const Joi = require('joi')
const router = express.Router();
var students = [
    {id :1, name : "student1", age : 23, class : "Glsi"},
    {id :2, name : "student2", age : 24, class : "Glsi"},
    {id :3, name : "student3", age : 23, class : "Glsi"}
]



router.get('', (req,res)=>{
    res.send(students)
})

router.get('/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found")
    res.send(student)
})



var student_schema = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    age : Joi.number().positive(),
    class : Joi.string()

});

var student_update_schema = Joi.object({
    name : Joi.string().min(3).max(20),
    age : Joi.number().positive(),
    class : Joi.string()

});


router.post('', (req,res)=>{
    /* let student = {
        id : students.length + 1,
        name : req.body.name,
        age : req.body.age,
        class : req.body.class
    } */
    /* if(!req.body.name || req.body.length < 3 )
        return res.status(400).send('Name must exist with at least 3 charcters') */
    let validation_result = student_schema.validate(req.body)
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message)
    let student = _.pick(req.body, ['name','age','class']);
    student.id = students.length + 1;
    students.push(student)
    res.send(student);
})
    
// put and delete

router.put('/:id',  (req,res) => {
    
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found.")
    let validation_result = student_update_schema.validate(req.body)
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message)
    /* if(req.body.name)
    student.name = req.body.name;
    if(req.body.age)
    student.age = req.body.age; */
    student = _.merge(student,req.body);
    res.send(student)
});

router.delete('/:id',  (req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found.")
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.send(student)
});


module.exports = router