const express = require('express');
const _ = require('lodash')
const port = process.env.PORT || 3000
const app = express();

var students = [
    {id :1, name : "student1", age : 23, class : "Glsi"},
    {id :2, name : "student2", age : 24, class : "Glsi"},
    {id :3, name : "student3", age : 23, class : "Glsi"}
]

app.get(['','/index','/'], (req,res)=>{
    res.send('<h1> Bonsoir GLSI-N </h1>')
});

app.get('/api/students', (req,res)=>{
    res.send(students)
})

app.get('/api/students/:id', (req,res)=>{
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found")
    res.send(student)
})

app.use(express.json())

app.post('/api/students', (req,res)=>{
    /* let student = {
        id : students.length + 1,
        name : req.body.name,
        age : req.body.age,
        class : req.body.class
    } */
    let student = _.pick(req.body, ['name','age','class']);
    student.id = students.length + 1;
    students.push(student)
    res.send(student);
})
    
// put and delete

app.put('/api/students/:id',  (req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found.")
    /* if(req.body.name)
    student.name = req.body.name;
    if(req.body.age)
    student.age = req.body.age; */
    student = _.merge(student,req.body);
    res.send(student)
});

app.delete('/api/students/:id',  (req,res) => {
    let student = students.find(s => s.id === parseInt(req.params.id));
    if(!student)
        return res.status(404).send("Student with the given Id is not found.")
    students = students.filter(s => s.id !== parseInt(req.params.id));
    res.send(student)
});

app.listen(port, ()=> console.log(`Server on ${port}....`));
