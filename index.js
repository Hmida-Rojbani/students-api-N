const express = require('express');
const appDebug = require('debug')('app:debug')
const logDebug = require('debug')('app:log')
const morgan = require('morgan')
const student_router = require('./routers/students')
const port = process.env.PORT || 3000
const app = express();

if(app.get('env') === 'development'){
    logDebug('Log is active')
    app.use(morgan('dev'))
}
    
app.use('/api/students',student_router)
app.get(['','/index','/'], (req,res)=>{
    res.send('<h1> Bonsoir GLSI-N </h1>')
});


app.listen(port, ()=> appDebug(`Server on ${port}....`));
