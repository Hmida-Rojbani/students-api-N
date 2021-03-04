const express = require('express');
const port = process.env.PORT || 3000
const app = express();

var students = [
    {id :1, name : "student1"},
    {id :2, name : "student2"},
    {id :3, name : "student3"}
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
    let student = {
        id : students.length + 1,
        name : req.body.name
    }
    students.push(student)
    res.send(student);
})

// put and delete

app.listen(port, ()=> console.log(`Server on ${port}....`));
