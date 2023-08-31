const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Notes')
const fetchuser = require('../middleware/getuser')
//route1 get all  notes data using get "/api/notes/fetchNotes"
router.get('/fetchNotes', fetchuser, async (req, res) => {
    
    try {     
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error :")
        
    }


})
//route 2 to add  notes data using get "/api/notes/addNotes". login req

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
    body('tag',"atleast 3 words").isLength({min:3}),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//route 3  POST for manipulation of existing notes in server "/api/notes/editNotes"(login required)
router.put('/editNotes/:id',fetchuser, async (req,res)=>{
    const {title,description,tag}= req.body;
    // create a new note obj
    const new_Note={};
    if(title){new_Note.title=title};
    if(description){new_Note.description=description};
    if(tag){new_Note.tag=tag};
//updating the note 
    let note= await Note.findById(req.params.id)
    //validating
    if(!note){ return res.status(404).send({error:"inavlid id or not found "})};
//validating
    if( note.user.toString()!== req.user.id ){return res.status(401).send("not allowed"); };

    note = await Note.findByIdAndUpdate(req.params.id,{$set:new_Note},{new:true})
    res.json({note})


})
//route 4  DELETE for manipulation of existing notes in server "/api/notes/deleteNotes/:id"(login required)
router.delete('/deleteNotes/:id',fetchuser,async (req,res)=>{
    let note= await Note.findById(req.params.id)
    //validating
    if(!note){ return res.status(404).send({error:"inavlid id or not found "})};
    //validating if id is not matched 
    if( note.user.toString()!== req.user.id ){return res.status(401).send("not allowed"); };

    note = await Note.findByIdAndDelete(req.params.id);
    res.send("note has been deleted");





})

module.exports = router
