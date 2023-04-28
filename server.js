const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001
const uuid = require('./helper/uuid.js');
const fs = require('fs')

app.use(express.static("public"))

const savedNotes =require('./db/db.json')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

//Route for /notes
app.get('/notes',(req,res)=>{
    res.sendFile((path.join(__dirname,"./public/notes.html")))
})

app.post('/api/notes', (req,res)=>{
    console.log(req.body);
    savedNotes.push(req.body)
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            id: uuid(),
            title,
            text
        };
        const response = {
            status: 'success',
            body: newNote
        };
        console.log(response);
        res.status(201).json('Error in posting review');
    }
   
})

app.get ('/api/notes',(req,res)=> {
    res.json(savedNotes);
})

//Route for /*
app.get('*',(req,res)=> {
    res.sendFile(path.join(__dirname,"./public/index.html"))

})






// listen on port 3001
app.listen(PORT,()=> {
    console.log('listening on port '+ PORT);
})


