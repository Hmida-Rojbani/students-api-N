const express = require('express');
const port = process.env.PORT || 3000
const app = express();

app.get(['','/index','/'], (req,res)=>{
    res.send('<h1> Bonsoir GLSI-N </h1>')
});

app.get('/name/:nom/:prenom', (req,res)=>{
    res.send(`<h1> Bonsoir  ${req.params.prenom} ${req.params.nom} </h1>`)
})

app.use(express.json())

app.post('/post/name', (req,res)=>{
    res.send(`Bonsoir  ${req.body.prenom} ${req.body.nom}`)
})



app.listen(port, ()=> console.log(`Server on ${port}....`));
