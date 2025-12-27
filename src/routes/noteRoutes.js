import express from "express"
import Note from '../models/Note.js'

const router = express.Router()

//Get All Notes
router.get('/', async (req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    }
    catch(error){
        res.status(500).json({ message: error.message})
    }
})

//Get Single Note
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found'})
        }
        res.json(note)
    }

    catch (error){
        res.status(500).json({ message:error.message})
    }
})

//Creat Note

router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        color: req.body.color,
    })

    try {
        const newNote = await note.save()
        res.status(201).json(newNote)
    }
    catch (error){
        res.status(400).json({ message: error.message})
    }
})

//Update 
router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found'})
        }

        if (req.body.title) note.title = req.body.title
        if (req.body.content) note.content = req.body.content
        if (req.body.color) note.color = req.body.color
        const updateNote =await note.save()
        res.json(updateNote)
    }

    catch (error){
        res.status(500).json({ message:error.message})
    }
})

//Delete Note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if(!note) {
            return res.status(404).json({ message: 'Note not found'})
        }
        await note.deleteOne
        res.json({message:'Note Deleted'})
    }

    catch (error){
        res.status(500).json({ message:error.message})
    }
})


export default router