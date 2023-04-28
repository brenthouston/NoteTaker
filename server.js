const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001
const uuid = require('./helper/uuid.js');
const fs = require('fs')

app.use(express.static("public"))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

//Route for /notes
app.get('/notes',(req,res)=>{
    res.sendFile((path.join(__dirname,"./public/notes.html")))
})

app.post('/api/notes', (req,res)=>{
   fs.readFile('./db/db.json', 'utf-8', (err,data)=> {
    if(err){
        return req.status(500).json({msg:"error reading database."})
    }else{
    const note = JSON.parse(data)
         const newNote = {
             id: uuid(),
             title:req.body.title,
             text:req.body.text
         };
         console.log(newNote);
         note.push(newNote)
         fs.writeFile("./db/db.json",JSON.stringify(note,null,4), (err)=>{
            if(err){
                return res.status(500).json({msg:"Error reading database"})
            }else{
                return res.json(newNote)
            }
         })
     }
   })
   
})

app.get ('/api/notes',(req,res)=> {
    fs.readFile('./db/db.json', 'utf-8',(err, data) => {
        if(err){
            return res.status(500).json({msg:"error reading database."})
        }else {
            const dataArr = JSON.parse(data);
            return res.json(dataArr)
             
        }
    })
    // res.json(savedNotes);
})

//Route for /*
app.get('/*',(req,res)=> {
    res.sendFile(path.join(__dirname,"./public/index.html"))

})






// listen on port 3001
app.listen(PORT,()=> {
    console.log('listening on http://localhost:'+ PORT);
})


